import { useState, useEffect } from "react";

export default function Content({
  currentTask,
  addNewTask,
  enteredTask,
  setEnteredTask,
  approveDelete,
  setApproveDelete,
  removeProject,
}) {
  const [errorMassage, setErrorMessage] = useState("");
  const [confirmDeleteProject, setConfirmDeleteProject] = useState(false);

  console.log("currentTask", currentTask[0]);

  function handleAddTask(e) {
    e.preventDefault();
    if (enteredTask.length < 2) {
      setErrorMessage(
        "Please enter a value with at least 2 characters in length"
      );
      return;
    }

    addNewTask(currentTask[0].id, enteredTask);
    // addNewTask(currentTask[0].id, enteredTask);
    setEnteredTask("");
  }

  function handleTaskInputChange(e) {
    setEnteredTask(e.target.value);
    setEnteredTask(e.target.value);
    setErrorMessage("");
  }

  function handleDeleteTask() {
    setConfirmDeleteProject((prev) => !prev);
  }

  useEffect(() => {
    setConfirmDeleteProject(false);
    return () => {
      setConfirmDeleteProject(false);
    };
  }, [currentTask]);

  return (
    <section className='h-full p-8 '>
      <div className='relative'>
        <h2 className='mb-6 text-5xl font-bold capitalize text-shadow-md text-emerald-700'>
          {currentTask[0].projectTitle}
        </h2>
        <p>Date: {currentTask[0].created}</p>
        <p>Theme: {currentTask[0].projectTitle}</p>

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
            * By pressing DELETE button you confirm that all tasks related to
            this project will be deleted
          </p>
        )}
      </div>

      <form
        className='relative flex items-center gap-6 mt-6 '
        onSubmit={handleAddTask}
        action='submit'
      >
        <input
          className={`${errorMassage ? " outline outline-custom-red" : null} relative px-3 py-2 bg-white border border-gray-300 rounded-xl h-fit w-3xl`}
          type='text'
          placeholder='Enter task here'
          value={enteredTask}
          onChange={handleTaskInputChange}
        />
        {errorMassage && (
          <span className='absolute italic font-semibold transition-all duration-300 transform -top-6 left-50 text-custom-red animate-pulse'>
            {errorMassage}
          </span>
        )}

        <button
          className='px-6 py-2 text-lg font-medium transition-all duration-300 bg-white cursor-pointer text-shadow-md h-fit hover:bg-amber-200 text-black/80 rounded-xl hover:outline hover:outline-gray-300 hover:text-emerald-700'
          type='submit'
        >
          + Add task
        </button>
      </form>
      <ul className='flex flex-col gap-2 mt-4'>
        Tasks:
        {currentTask[0].projectTasks.map((task, idx) => {
          return (
            <li className='flex flex-row gap-3 ' key={idx}>
              <p
                className=' h-[42px] flex-1 max-w-3xl px-4 py-2 bg-white border border-gray-200 rounded-xl'
                type='text'
              >
                {task}
              </p>
              {approveDelete.includes(idx) ? (
                <button
                  className='h-[42px] px-2 py-1 transition-all duration-300 bg-white/90 text-emerald-700 rounded-xl hover:scale-105 hover:font-semibold hover:bg-white'
                  onClick={() => {
                    console.log("Cancel");
                    setApproveDelete([]);
                  }}
                >
                  Cancel
                </button>
              ) : (
                <button
                  className='h-[42px] text-2xl p-[5px] transition-all duration-300 hover:scale-120 hover:font-semibold hover:text-custom-red'
                  type='button'
                  // onClick={() => setApproveDelete((prev) => !prev)}

                  onClick={() =>
                    setApproveDelete((prev) =>
                      prev.includes(idx)
                        ? prev.filter((id) => id !== idx)
                        : [...prev, idx]
                    )
                  }
                >
                  ×
                </button>
              )}
              {approveDelete.includes(idx) && (
                <>
                  <button
                    className='h-[42px] px-2 py-1 transition-all duration-300 bg-white/90 text-custom-red rounded-xl hover:scale-105 hover:font-semibold hover:bg-white'
                    onClick={() => console.log("DELETE")}
                  >
                    Delete
                  </button>
                </>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
