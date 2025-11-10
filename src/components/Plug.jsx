import AddProject from "./AddProject";

export default function Plug({ toggleModal }) {
  return (
    <div className='content-center text-center'>
      <p className='text-3xl'>Choose task to work with</p>
      <p className='text-2xl'>or</p>
      <AddProject toggleModal={toggleModal} />
    </div>
  );
}
