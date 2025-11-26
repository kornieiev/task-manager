import Button from "./Button";
import imgTodoList from "../assets/todo-list-icon.png";

export default function Plug({ toggleModal }) {
  return (
    <div className='content-center text-center'>
      <img
        className='mx-auto w-60'
        src={imgTodoList}
        alt='Task list cartoon pad'
      />
      <p className='text-3xl'>Choose task to work with</p>
      <p className='mb-6 text-2xl'>or</p>
      <Button onClick={toggleModal}>Create New Project</Button>
    </div>
  );
}
