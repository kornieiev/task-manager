// import { useRef, useState } from "react";

import { useState } from "react";

export default function Content({
  currentTask,
  addNewTask,
  enteredValue,
  setEnteredValue,
}) {
  const [enteredTask, setEnteredTask] = useState("");
  function handleClick() {
    console.log("enteredTask", enteredTask);
    addNewTask(currentTask[0].id, enteredValue);
    setEnteredValue("");
  }

  function onHandleChange(e) {
    setEnteredTask(e.target.value);
    setEnteredValue(e.target.value);
  }

  return (
    <section className='mt-26 p-8'>
      <h2 className='font-bold capitalize text-5xl text-emerald-700 mb-6'>
        {currentTask[0].projectTitle}
      </h2>
      <p>Date: {currentTask[0].created}</p>
      <p>Theme: {currentTask[0].projectTitle}</p>

      <form className='flex gap-6 mt-6 items-center' action='submit'>
        <input
          className='bg-white border border-gray-300 rounded-xl px-3 py-2 h-fit w-3xl'
          type='text'
          placeholder='Enter task name'
          value={enteredValue}
          onChange={onHandleChange}
        />
        <button
          className='h-fit bg-white hover:bg-amber-200 transition-all duration-300 text-black/80 text-lg font-medium px-6 py-2 rounded-xl hover:outline hover:outline-gray-300 hover:text-emerald-700'
          onClick={handleClick}
          type='button'
        >
          + Add task
        </button>
      </form>
      <ul className='flex flex-col gap-2'>
        Tasks:
        {currentTask[0].projectTasks.map((task, idx) => {
          return (
            <li key={idx}>
              <p
                className='border-gray-200 bg-white border px-2 py-1 rounded-xl max-w-3xl'
                type='text'
              >
                {task}
              </p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
