import AddProjectButton from "./AddProject";

export default function Plug({ toggleModal }) {
  return (
    <div className='content-center text-center'>
      <p className='text-3xl'>Choose task to work with</p>
      <p className='mb-6 text-2xl'>or</p>
      <AddProjectButton toggleModal={toggleModal}>
        Create New Project
      </AddProjectButton>
    </div>
  );
}
