import express from "express";
import { projectsRouter } from "./projects.js";
// import { tasksRouter } from "./tasks.js"; // когда будет создан отдельный роутер для задач

const router = express.Router();

// Подключение роутеров к соответствующим путям:
router.use("/projects", projectsRouter);

// router.use("/tasks", tasksRouter); // для будущих отдельных задач

export default router;
