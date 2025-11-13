import { useEffect, useState } from "react";
import Aside from "./Aside";
import Content from "./Content";
import NewProjectModal from "./NewProjectModal";
import Plug from "./Plug";
import { fetchProjects, createTask, createProject } from "../services/api";

export default function Layout() {
  const [projects, setProjects] = useState([]);
  const [activeTask, setActiveTask] = useState(null);
  const [enteredTask, setEnteredTask] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [approveDelete, setApproveDelete] = useState([]);

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
    setEnteredTask("");
  }

  async function addNewTask(id, newTask) {
    try {
      // Отправляем новую задачу на сервер
      await createTask(id, newTask);

      // После успешного создания перезагружаем данные
      const updatedProjects = await fetchProjects();
      setProjects(updatedProjects);
    } catch (error) {
      console.error("Ошибка при добавлении задачи:", error);
      // Можешь добавить уведомление пользователю об ошибке
    }
  }

  function addNewProject(newProject) {
    console.log("addNewProject");
  }

  function handleToggleModal() {
    setShowModal((prev) => !prev);
  }

  return (
    <div className='grid grid-cols-[1fr_4fr] min-w-screen w-full bg-custom-yellow h-screen gap-4'>
      <Aside
        projects={projects}
        activeTask={activeTask}
        handleActiveTask={handleActiveTask}
        toggleModal={handleToggleModal}
      />
      <NewProjectModal
        showModal={showModal}
        toggleModal={handleToggleModal}
        addNewProject={addNewProject}
      />
      {activeTask ? (
        <Content
          className='p-4 bg-blue-100 '
          currentTask={projects.filter((task) => task.id === activeTask)}
          addNewTask={addNewTask}
          enteredTask={enteredTask}
          setEnteredTask={setEnteredTask}
          approveDelete={approveDelete}
          setApproveDelete={setApproveDelete}
        />
      ) : (
        <Plug toggleModal={handleToggleModal} />
      )}
    </div>
  );
}
