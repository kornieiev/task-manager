import AddProject from "./AddProject";
import Logo from "./Logo";
import TaskList from "./TaskList";

export default function Aside({
  dummyProjects,
  activeTask,
  handleActiveTask,
  toggleModal,
}) {
  return (
    <div className=' bg-amber-200 p-6 mt-16 rounded-r-4xl'>
      <Logo />

      <h2 className='uppercase mt-10 text-2xl font-bold pl-4'>
        your projects:
      </h2>

      <AddProject toggleModal={toggleModal} />

      <TaskList
        dummyProjects={dummyProjects}
        activeTask={activeTask}
        handleActiveTask={handleActiveTask}
      />
    </div>
  );
}
