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
    <div className='p-6 mt-16 bg-custom-light-blue rounded-tr-4xl'>
      <Logo />

      <h2 className='mt-10 text-2xl font-bold text-center uppercase text-custom-red font-exo-2'>
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
