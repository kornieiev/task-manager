import express from "express";
import { projectsRouter } from "./projects.js";
import { tasksRouter } from "./tasks.js";

const router = express.Router();

// Подключение роутеров к соответствующим путям:
router.use("/projects", projectsRouter); // роутер для проектов

router.use("/tasks", tasksRouter); // роутер для задач

export default router;
