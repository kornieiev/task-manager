import { useEffect, useState } from "react";
import Aside from "./Aside";
import Content from "./Content";
import Plug from "./Plug";
import {
  fetchProjects,
  createProject,
  deleteProject,
  createTask,
  deleteTask,
  toggleTask,
} from "../services/api";

export default function Layout() {
  const [projects, setProjects] = useState([]);
  const [activeTask, setActiveTask] = useState(null);

  useEffect(() => {
    async function getAllProjects() {
      const projects = await fetchProjects();
      setProjects(projects);
    }
    getAllProjects();
  }, []);

  function handleActiveTask(id) {
    if (!id) {
      return;
    }
    setActiveTask(id);
  }

  async function addNewTask(id, newTask, priority = "low") {
    try {
      // Отправляем новую задачу на сервер
      await createTask(id, newTask, priority);

      // После успешного создания перезагружаем данные
      const updatedProjects = await fetchProjects();
      setProjects(updatedProjects);
    } catch (error) {
      console.error("Ошибка при добавлении задачи:", error);
    }
  }

  async function removeTask(projectId, taskId) {
    console.log("СРАБАТЫВАНИЕ removeTask");
    console.log("first-projectId", projectId);
    console.log("first-taskId", taskId);

    try {
      await deleteTask(projectId, taskId);

      const updatedProjects = await fetchProjects();
      setProjects(updatedProjects);
    } catch (error) {
      console.error("Ошибка при удалении задачи:", error);
    }
  }

  async function addNewProject(title, description, dueDate) {
    try {
      await createProject(title, description, dueDate);
      const updatedProjects = await fetchProjects();

      if (updatedProjects[0].id) {
        setActiveTask(updatedProjects[0].id);
      }

      setProjects(updatedProjects);
    } catch (error) {
      console.error("Ошибка при добавлении проекта:", error);
    }
  }

  async function removeProject(id) {
    try {
      await deleteProject(id);
      const updatedProjects = await fetchProjects();
      setProjects(updatedProjects);
      setActiveTask(null);
    } catch (error) {
      console.error("Ошибка при удалении проекта:", error);
    }
  }

  async function onTaskComplittedChange(projectId, taskId, completed) {
    try {
      await toggleTask(projectId, taskId, completed);

      const updatedProjects = await fetchProjects();
      setProjects(updatedProjects);
    } catch (error) {
      console.error(
        "Ошибка при переключении статуса выполнения задачи:",
        error
      );
    }
  }

  return (
    <main className='grid grid-cols-[1fr_4fr] min-w-screen w-full bg-custom-yellow h-screen gap-4'>
      <Aside
        projects={projects}
        activeTask={activeTask}
        handleActiveTask={handleActiveTask}
        // onClick={handleToggleModal}
        addNewProject={addNewProject}
      />
      {activeTask ? (
        <Content
          className='p-4 bg-blue-100 '
          currentTask={projects.filter((task) => task.id === activeTask)}
          addNewTask={addNewTask}
          removeProject={removeProject}
          removeTask={removeTask}
          onTaskComplittedChange={onTaskComplittedChange}
        />
      ) : (
        <Plug addNewProject={addNewProject} />
      )}
    </main>
  );
}
