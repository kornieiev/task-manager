import { useState } from "react";

export default function Content({
  currentTask,
  addNewTask,
  enteredTask,
  setEnteredTask,
  approveDelete,
  setApproveDelete,
}) {
  const [errorMassage, setErrorMessage] = useState("");

  function handleClick(e) {
    e.preventDefault();
    if (enteredTask.length < 2) {
      setErrorMessage(
        "Please enter a value with at least 2 characters in length"
      );
      return;
    }

    console.log("enteredValue", enteredTask);
    addNewTask(currentTask[0].id, enteredTask);
    setEnteredTask("");
  }

  function onHandleChange(e) {
    setEnteredTask(e.target.value);
    setEnteredTask(e.target.value);
    setErrorMessage("");
  }

  return (
    <section className='p-8 mt-26'>
      <h2 className='mb-6 text-5xl font-bold capitalize text-emerald-700'>
        {currentTask[0].projectTitle}
      </h2>
      <p>Date: {currentTask[0].created}</p>
      <p>Theme: {currentTask[0].projectTitle}</p>

      <form
        className='relative flex items-center gap-6 mt-6 '
        onSubmit={handleClick}
        action='submit'
      >
        <input
          className={`${errorMassage ? " outline outline-custom-red" : null} relative px-3 py-2 bg-white border border-gray-300 rounded-xl h-fit w-3xl`}
          type='text'
          placeholder='Enter task here'
          value={enteredTask}
          onChange={onHandleChange}
        />
        {errorMassage && (
          <span className='absolute italic font-semibold transition-all duration-300 transform -top-6 left-50 text-custom-red animate-pulse'>
            {errorMassage}
          </span>
        )}

        <button
          className='px-6 py-2 text-lg font-medium transition-all duration-300 bg-white h-fit hover:bg-amber-200 text-black/80 rounded-xl hover:outline hover:outline-gray-300 hover:text-emerald-700'
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
