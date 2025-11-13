import AddProject from "./AddProject";
import Logo from "./Logo";
import TaskList from "./TaskList";

export default function Aside({
  projects,
  activeTask,
  handleActiveTask,
  toggleModal,
}) {
  return (
    <div className='max-h-screen'>
      <Logo />

      <div className='h-[calc(100%-150px)] p-6 bg-custom-light-blue rounded-tr-4xl'>
        <AddProject toggleModal={toggleModal}>+ New Project</AddProject>
        <h2 className='my-6 text-2xl font-bold text-center uppercase text-custom-red font-exo-2'>
          your projects:
        </h2>

        <TaskList
          projects={projects}
          activeTask={activeTask}
          handleActiveTask={handleActiveTask}
        />
      </div>
    </div>
  );
}
