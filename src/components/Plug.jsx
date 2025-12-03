import Button from "./Button";
import imgTodoList from "../assets/todo-list-icon.png";
import { useRef } from "react";
import Modal from "./Modal";
import NewProject from "./NewProject";

export default function Plug({ addNewProject }) {
  const modalRef = useRef();

  function handleButtonOpenModal() {
    modalRef.current.open();
  }

  function handleButtonCloseModal() {
    modalRef.current.close();
  }

  return (
    <>
      <Modal ref={modalRef} buttonText='Close (test)'>
        <NewProject
          closeModal={handleButtonCloseModal}
          addNewProject={addNewProject}
        />
      </Modal>
      <section className='content-center text-center'>
        <img
          className='mx-auto w-60'
          src={imgTodoList}
          alt='Task list cartoon pad'
        />
        <p className='text-3xl'>Choose task to work with</p>
        <p className='mb-6 text-2xl'>or</p>
        <Button onClick={handleButtonOpenModal}>Create New Project</Button>
      </section>
    </>
  );
}
