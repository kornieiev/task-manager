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
    <section className='p-8 mt-26'>
      <h2 className='mb-6 text-5xl font-bold capitalize text-emerald-700'>
        {currentTask[0].projectTitle}
      </h2>
      <p>Date: {currentTask[0].created}</p>
      <p>Theme: {currentTask[0].projectTitle}</p>

      <form className='flex items-center gap-6 mt-6' action='submit'>
        <input
          className='px-3 py-2 bg-white border border-gray-300 rounded-xl h-fit w-3xl'
          type='text'
          placeholder='Enter task name'
          value={enteredValue}
          onChange={onHandleChange}
        />
        <button
          className='px-6 py-2 text-lg font-medium transition-all duration-300 bg-white h-fit hover:bg-amber-200 text-black/80 rounded-xl hover:outline hover:outline-gray-300 hover:text-emerald-700'
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
                className='max-w-3xl px-2 py-1 bg-white border border-gray-200 rounded-xl'
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
