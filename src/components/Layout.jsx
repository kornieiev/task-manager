import { useState } from "react";
import Aside from "./Aside";
import Content from "./Content";
import NewProjectModal from "./NewProjectModal";
import Plug from "./Plug";

const dummyProjects = [
  {
    id: "1",
    projectTitle: "Shopping list",
    projectText: "some dummy text 1",
    created: "22-10-2025",
    projectTasks: ["dummy task name 1-1", "dummy task name 1-2"],
    status: false,
  },
  {
    id: "2",
    projectTitle: "Study",
    projectText: "some dummy text 2",
    created: "22-10-2025",
    projectTasks: ["dummy task name 2-1", "dummy task name 2-2"],
    status: true,
  },
  {
    id: "3",
    projectTitle: "To do list",
    projectText: "some dummy text 3",
    created: "22-10-2025",
    projectTasks: ["dummy task name 3-1", "dummy task name 3-2"],
    status: false,
  },
  {
    id: "4",
    projectTitle: "Gym List",
    projectText: "some dummy text 4",
    created: "22-10-2025",
    projectTasks: ["dummy task name 4-1", "dummy task name 4-2"],
    status: false,
  },
];

export default function Layout() {
  const [tasks, setTasks] = useState(dummyProjects);
  const [activeTask, setActiveTask] = useState(null);
  const [enteredTask, setEnteredTask] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [approveDelete, setApproveDelete] = useState([]);

  function handleActiveTask(id) {
    if (!id) {
      return;
    }
    setActiveTask(id);
    setEnteredTask("");
  }

  function addNewTask(id, newTask) {
    const currentTask = tasks.find((task) => task.id === id);
    if (!currentTask) {
      return;
    }

    setTasks((prev) => {
      return prev.map((task) =>
        task.id === id
          ? { ...task, projectTasks: [...task.projectTasks, newTask] }
          : task
      );
    });
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
        className='p-4 '
        dummyProjects={tasks}
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
          currentTask={tasks.filter((task) => task.id === activeTask)}
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
