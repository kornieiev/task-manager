import express from "express";
import pool from "../db.js";

const tasksRouter = express.Router();

// ! Добавить новую задачу в проект:
tasksRouter.post("/:id", async (req, res) => {
  try {
    // Получаем ID проекта из параметров URL
    const projectId = parseInt(req.params.id);
    // Получаем текст задачи из тела запроса
    const { taskText } = req.body;

    // Проверяем что задача не пустая
    if (!taskText || taskText.trim().length === 0) {
      return res.status(400).json({
        error: "Task text is required and cannot be empty",
      });
    }

    // Проверяем что проект существует и принадлежит пользователю
    const projectCheck = await pool.query(
      `
      SELECT id FROM projects 
      WHERE id = $1 AND user_id = 1
    `,
      [projectId]
    );

    if (projectCheck.rows.length === 0) {
      return res.status(404).json({
        error: "Project not found or access denied",
      });
    }

    // Добавляем новую задачу в базу данных
    const newTaskResult = await pool.query(
      `
      INSERT INTO tasks (project_id, task_text, completed, priority)
      VALUES ($1, $2, false, 'low')
      RETURNING id, task_text, completed, priority, created_at
    `,
      [projectId, taskText.trim()]
    );

    const newTask = newTaskResult.rows[0];

    // Отправляем созданную задачу обратно
    res.status(201).json({
      message: "Task created successfully",
      task: {
        id: newTask.id,
        taskText: newTask.task_text,
        completed: newTask.completed,
        priority: newTask.priority,
        createdAt: newTask.created_at,
      },
    });
  } catch (error) {
    console.error("Ошибка при создании задачи:", error);
    res.status(500).json({ error: error.message });
  }
});

// ! Удалить задачу из проекта:
tasksRouter.delete("/:projectId/:taskId", async (req, res) => {
  try {
    // 1. Получаем параметры из URL
    const projectId = parseInt(req.params.projectId);
    const taskId = parseInt(req.params.taskId);

    // 2. Валидация параметров
    if (isNaN(projectId) || isNaN(taskId)) {
      return res.status(400).json({
        error: "Invalid project ID or task ID",
      });
    }

    // 3. Проверяем что проект существует и принадлежит пользователю
    const projectCheck = await pool.query(
      `SELECT id FROM projects WHERE id = $1 AND user_id = 1`,
      [projectId]
    );

    if (projectCheck.rows.length === 0) {
      return res.status(404).json({
        error: "Project not found or access denied",
      });
    }

    // 4. Проверяем что задача существует и принадлежит этому проекту
    const taskCheck = await pool.query(
      `SELECT id, task_text FROM tasks WHERE id = $1 AND project_id = $2`,
      [taskId, projectId]
    );

    if (taskCheck.rows.length === 0) {
      return res.status(404).json({
        error: "Task not found or does not belong to this project",
      });
    }

    const task = taskCheck.rows[0];

    // 5. Удаляем задачу
    await pool.query(`DELETE FROM tasks WHERE id = $1`, [taskId]);

    // 6. Возвращаем результат
    res.json({
      message: "Task deleted successfully",
      deletedTask: {
        id: taskId,
        text: task.task_text,
        projectId: projectId,
      },
    });
  } catch (error) {
    console.error("Ошибка при удалении задачи:", error);
    res.status(500).json({ error: error.message });
  }
});

// ! Тогл выполнения задачи:
tasksRouter.patch("/:projectId/:taskId", async (req, res) => {
  try {
    // 1. Получаем параметры из URL
    const projectId = parseInt(req.params.projectId);
    const taskId = parseInt(req.params.taskId);

    // 2. Получаем новый статус из тела запроса
    const { completed } = req.body;

    // 3. Валидация параметров
    if (isNaN(projectId) || isNaN(taskId)) {
      return res.status(400).json({
        error: "Invalid project ID or task ID",
      });
    }

    // 4. Валидация completed (должен быть boolean)
    if (typeof completed !== "boolean") {
      return res.status(400).json({
        error: "Completed field must be a boolean value",
      });
    }

    // 5. Проверяем что проект существует и принадлежит пользователю
    const projectCheck = await pool.query(
      `SELECT id FROM projects WHERE id = $1 AND user_id = 1`,
      [projectId]
    );

    if (projectCheck.rows.length === 0) {
      return res.status(404).json({
        error: "Project not found or access denied",
      });
    }

    // 6. Проверяем что задача существует и принадлежит этому проекту
    const taskCheck = await pool.query(
      `SELECT id, task_text, completed FROM tasks WHERE id = $1 AND project_id = $2`,
      [taskId, projectId]
    );

    if (taskCheck.rows.length === 0) {
      return res.status(404).json({
        error: "Task not found or does not belong to this project",
      });
    }

    // 7. Обновляем статус задачи
    const updatedTaskResult = await pool.query(
      `UPDATE tasks SET completed = $1, updated_at = NOW() 
       WHERE id = $2 AND project_id = $3 
       RETURNING id, task_text, completed, priority, updated_at`,
      [completed, taskId, projectId]
    );

    const updatedTask = updatedTaskResult.rows[0];

    // 8. Возвращаем обновленную задачу
    res.json({
      message: "Task status updated successfully",
      task: {
        id: updatedTask.id,
        text: updatedTask.task_text,
        completed: updatedTask.completed,
        priority: updatedTask.priority,
        updatedAt: updatedTask.updated_at,
        projectId: projectId,
      },
    });
  } catch (error) {
    console.error("Ошибка при обновлении статуса задачи:", error);
    res.status(500).json({ error: error.message });
  }
});

export { tasksRouter }; // экспортируем роутер для использования в главном файле приложения
