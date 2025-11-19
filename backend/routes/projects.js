import express from "express";
import pool from "../db.js";

const projectsRouter = express.Router();

// ! Получить все проекты с их задачами для конкретного пользователя
projectsRouter.get("/", async (req, res) => {
  try {
    // Получаем все проекты пользователя с ID = 1 (пока без авторизации)
    const projectsResult = await pool.query(`
      SELECT id, title, description, due_date, status, created_at, updated_at
      FROM projects
      WHERE user_id = 1
      ORDER BY created_at DESC
    `);

    const projects = projectsResult.rows;

    // Для каждого проекта получаем его задачи
    for (let project of projects) {
      const tasksResult = await pool.query(
        `
        SELECT id, task_text, completed, priority, created_at
        FROM tasks
        WHERE project_id = $1
        ORDER BY created_at ASC
      `,
        [project.id]
      );

      // Добавляем задачи в проект
      project.projectTasks = tasksResult.rows.map((task) => {
        return {
          id: task.id,
          title: task.task_text,
          completed: task.completed,
          priority: task.priority,
        };
      });

      // Переименовываем поля для совместимости с React кодом
      project.projectTitle = project.title;
      project.projectText = project.description;
      project.created = project.created_at.toISOString().split("T")[0]; // Форматируем дату
    }

    console.log("projects", projects);

    console.log("projects.projectTasks", projects[0].projectTasks);

    // Отправляем проекты в нужном формате
    res.json(projects);
  } catch (error) {
    console.error("Ошибка при получении проектов:", error);
    res.status(500).json({ error: error.message });
  }
});

// ! Создать новый проект
projectsRouter.post("/", async (req, res) => {
  try {
    // Получаем данные проекта из тела запроса
    const { title, description, dueDate } = req.body;

    // Проверяем обязательные поля
    if (!title || title.trim().length === 0) {
      return res.status(400).json({
        error: "Project title is required",
      });
    }

    // Создаем новый проект в базе данных
    const newProjectResult = await pool.query(
      `
      INSERT INTO projects (title, description, due_date, status, user_id)
      VALUES ($1, $2, $3, false, 1)
      RETURNING id, title, description, due_date, status, created_at, updated_at
    `,
      [title.trim(), description?.trim() || "", dueDate || null]
    );

    const newProject = newProjectResult.rows[0];

    // Форматируем ответ в том же стиле что и GET /api/projects
    const formattedProject = {
      id: newProject.id,
      title: newProject.title,
      projectTitle: newProject.title,
      description: newProject.description,
      projectText: newProject.description,
      due_date: newProject.due_date,
      status: newProject.status,
      created_at: newProject.created_at,
      created: newProject.created_at.toISOString().split("T")[0],
      projectTasks: [], // Новый проект без задач
    };

    res.status(201).json({
      message: "Project created successfully",
      project: formattedProject,
    });
  } catch (error) {
    console.error("Ошибка при создании проекта:", error);
    res.status(500).json({ error: error.message });
  }
});

// ! Удалить проект и все связанные с ним задачи
projectsRouter.delete("/:id", async (req, res) => {
  try {
    // Получаем ID проекта из параметров URL
    const projectId = parseInt(req.params.id);

    // Проверяем что проект существует и принадлежит пользователю
    const projectCheck = await pool.query(
      `
      SELECT id, title FROM projects 
      WHERE id = $1 AND user_id = 1
    `,
      [projectId]
    );

    if (projectCheck.rows.length === 0) {
      return res.status(404).json({
        error: "Project not found or access denied",
      });
    }

    const project = projectCheck.rows[0];

    // Сначала удаляем все задачи проекта (из-за foreign key constraint)
    const deletedTasksResult = await pool.query(
      `
      DELETE FROM tasks 
      WHERE project_id = $1
      RETURNING id
    `,
      [projectId]
    );

    // Затем удаляем сам проект
    await pool.query(
      `
      DELETE FROM projects 
      WHERE id = $1
    `,
      [projectId]
    );

    res.json({
      message: "Project and all related tasks deleted successfully",
      deletedProject: {
        id: projectId,
        title: project.title,
        deletedTasksCount: deletedTasksResult.rows.length,
      },
    });
  } catch (error) {
    console.error("Ошибка при удалении проекта:", error);
    res.status(500).json({ error: error.message });
  }
});

export { projectsRouter }; // экспортируем роутер для использования в главном файле приложения
