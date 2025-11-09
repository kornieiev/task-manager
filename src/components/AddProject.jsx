export default function AddProject({ toggleModal }) {
  return (
    <div className='h-20'>
      <button
        className='px-4 py-2 mt-10 mb-4 ml-8 text-xl font-medium text-white transition-all duration-300 outline rounded-xl bg-custom-carrot hover:scale-98 hover:outline-2 hover:text-white/80 hover:outline-white/80'
        onClick={toggleModal}
      >
        + Add Project
      </button>
    </div>
  );
}
