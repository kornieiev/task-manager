/* eslint-disable no-undef */ // Отключаем ESLint ошибки о неопределенных переменных (process, __dirname)
// Импортируем Express - фреймворк для создания веб-серверов в Node.js
import express from "express";
// Импортируем CORS - middleware для разрешения запросов с других доменов (React на 3000, API на 3001)
import cors from "cors";
// Импортируем dotenv для загрузки переменных окружения из файла .env
import dotenv from "dotenv";
// Импортируем наш пул соединений с PostgreSQL из файла db.js
import pool from "./db.js";

// Загружаем переменные окружения из файла .env в process.env
dotenv.config();

// Создаем экземпляр Express приложения
const app = express();
// Определяем порт сервера: берем из .env или используем 3001 по умолчанию
const PORT = process.env.PORT || 3003;

// Настройка middleware (промежуточного ПО)
app.use(cors()); // Разрешаем CORS - чтобы React мог делать запросы к API
app.use(express.json()); // Парсим JSON в теле запросов автоматически

// Создаем тестовый endpoint для проверки работы API и подключения к БД
app.get("/api/test", async (req, res) => {
  try {
    // Выполняем SQL запрос для получения текущего времени из PostgreSQL
    const result = await pool.query("SELECT NOW() as current_time");
    // Отправляем успешный ответ с сообщением и временем
    res.json({
      message: "✅ Backend connected to database!",
      time: result.rows[0].current_time,
    });
  } catch (error) {
    // Если произошла ошибка, отправляем статус 500 и сообщение об ошибке
    res.status(500).json({ error: error.message });
  }
});

// Получить все проекты с их задачами для конкретного пользователя
app.get("/api/projects", async (req, res) => {
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

      // Добавляем задачи в проект (как в твоем dummyProjects)
      project.projectTasks = tasksResult.rows.map((task) => task.task_text);

      // Переименовываем поля для совместимости с React кодом
      project.projectTitle = project.title;
      project.projectText = project.description;
      project.created = project.created_at.toISOString().split("T")[0]; // Форматируем дату
    }

    // Отправляем проекты в том же формате, что у тебя в dummyProjects
    res.json(projects);
  } catch (error) {
    console.error("Ошибка при получении проектов:", error);
    res.status(500).json({ error: error.message });
  }
});

// Добавить новую задачу в проект
app.post("/api/projects/:id/tasks", async (req, res) => {
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

// Создать новый проект
app.post("/api/projects", async (req, res) => {
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

// Запускаем сервер на указанном порту и выводим сообщение в консоль
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
