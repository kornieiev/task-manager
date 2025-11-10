export default function AddProject({ toggleModal }) {
  return (
    <div className='h-20'>
      <button
        className='px-4 py-2 mt-10 mb-4 ml-8 text-xl font-medium transition-all duration-300 text-custom-blue outline rounded-xl bg-amber-200 hover:scale-98 hover:outline hover:text-black hover:outline-black'
        onClick={toggleModal}
      >
        + New Project
      </button>
    </div>
  );
}
