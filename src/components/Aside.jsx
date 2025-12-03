import { useRef } from "react";
import Button from "./Button";
import Logo from "./Logo";
import Modal from "./Modal";
import TaskList from "./TaskList";
import NewProject from "./NewProject";

export default function Aside({
  projects,
  activeTask,
  handleActiveTask,
  addNewProject,
  ...props
}) {
  const modalRef = useRef();

  function handleButtonOpenModal() {
    modalRef.current.open();
  }

  function handleButtonCloseModal() {
    modalRef.current.close();
  }

  return (
    <section className='max-h-screen'>
      <Logo />

      <aside className='h-[calc(100%-150px)] py-10 px-6 bg-custom-light-blue rounded-tr-4xl border-t-2 border-r-2 border-custom-blue/80 shadow-lg shadow-custom-blue'>
        <Button {...props} onClick={handleButtonOpenModal}>
          + New Project
        </Button>

        <Modal ref={modalRef} buttonText='Close (test)'>
          <NewProject
            closeModal={handleButtonCloseModal}
            addNewProject={addNewProject}
          />
        </Modal>

        <h2 className='my-6 text-2xl font-bold text-center uppercase text-custom-red font-exo-2'>
          your projects:
        </h2>

        <TaskList
          projects={projects}
          activeTask={activeTask}
          handleActiveTask={handleActiveTask}
        />
      </aside>
    </section>
  );
}
