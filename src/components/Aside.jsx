import AddProjectButton from "./AddProject";
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

      <div className='h-[calc(100%-150px)] py-10 px-6 bg-custom-light-blue rounded-tr-4xl border-t-2 border-r-2 border-custom-blue/80 shadow-lg shadow-custom-blue'>
        <AddProjectButton toggleModal={toggleModal}>
          + New Project
        </AddProjectButton>
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
