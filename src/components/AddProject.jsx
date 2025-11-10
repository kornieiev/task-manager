export default function AddProject({ toggleModal }) {
  return (
    <div className='content-center h-20 text-center'>
      <button
        className='px-4 py-2 mx-auto text-xl font-medium transition-all duration-300 text-custom-blue outline rounded-xl bg-amber-200 hover:scale-98 hover:outline hover:text-black hover:outline-black'
        onClick={toggleModal}
      >
        + New Project
      </button>
    </div>
  );
}
