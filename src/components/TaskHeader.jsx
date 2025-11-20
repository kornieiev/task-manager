export default function TaskHeader({
  currentTask,
  confirmDeleteProject,
  setConfirmDeleteProject,
  removeProject,
  handleDeleteTask,
}) {
  return (
    <div className='relative'>
      <h2 className='text-5xl font-bold capitalize border-mb-6 text-shadow-md text-emerald-700'>
        {currentTask[0].projectTitle}
      </h2>
      <p>Date: {currentTask[0].created}</p>
      <p>Description: {currentTask[0].projectText}</p>

      {confirmDeleteProject ? (
        <div className='absolute flex gap-3 right-5 top-3'>
          <button
            className='px-2 py-1 transition-all duration-300 cursor-pointer text-shadow-md bg-white/90 text-emerald-700 rounded-xl hover:scale-105 hover:font-semibold hover:bg-white'
            onClick={() => {
              setConfirmDeleteProject((prev) => !prev);
            }}
          >
            Cancel
          </button>
          <button
            className='px-2 py-1 transition-all duration-300 cursor-pointer text-shadow-md bg-white/90 text-custom-red rounded-xl hover:scale-105 hover:font-semibold hover:bg-white'
            onClick={() => {
              removeProject(currentTask[0].id);
            }}
          >
            DELETE
          </button>
        </div>
      ) : (
        <button
          className='absolute px-3 py-2 text-xl transition-all duration-300 cursor-pointer text-shadow-md rounded-xl right-5 top-3 bg-custom-red/30 hover:scale-103 hover:bg-custom-red/60 hover:text-white'
          type='button'
          onClick={handleDeleteTask}
        >
          Delete project
        </button>
      )}
      {confirmDeleteProject && (
        <p className='absolute px-2 font-semibold rounded-xl right-5 top-16 bg-white/50 text-custom-red'>
          * By pressing DELETE button you confirm that all tasks related to this
          project will be deleted
        </p>
      )}
    </div>
  );
}
