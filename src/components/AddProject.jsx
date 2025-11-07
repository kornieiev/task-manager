export default function AddProject({ toggleModal }) {
  return (
    <div className='h-20'>
      <button
        className='mt-10 mb-4 ml-8 px-4 py-2 rounded-xl outline-none transition-all duration-200 bg-emerald-700 text-amber-300 text-xl hover:scale-97  hover:text-amber-100 border hover:border-2'
        onClick={toggleModal}
      >
        + Add Project
      </button>
    </div>
  );
}
