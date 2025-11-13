import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import { createProject } from "../services/api";
import validateForm from "../helpers.js/newProjectValidation";

const style = {
  label:
    "mt-3 mb-1 text-2xl font-bold tracking-wide text-center uppercase transition-all duration-300 peer-focus/title:text-custom-red peer-focus/title:scale-105 text-black/70 peer-focus/title:translate-y-1",
  input:
    "px-4 py-2 text-2xl tracking-wide border peer/title rounded-xl min-w-xl outline-none focus:scale-105 duration-300 transition-all",
  inputWrapper: "mt-4 flex flex-col-reverse ",
  button:
    "px-8 py-4 mx-auto mt-12 text-2xl tracking-wide uppercase transition-all my-5 duration-300 peer/button bg-emerald-700 text-amber-200 rounded-xl hover:text-emerald-700 hover:bg-amber-200 hover:scale-105",
  line: "mt-4 text-transparent mx-auto w-0 peer-hover/button:w-xl h-[3px] peer-hover/button:bg-emerald-700 border transition-all duration-700",
};

export default function NewProjectModal({
  showModal,
  toggleModal,
  addNewProject,
}) {
  const titleRef = useRef();
  const descriptionRef = useRef();
  const dueDateRef = useRef();

  const [errors, setErrors] = useState({});

  if (!showModal) return null;

  function handleSubmit(e) {
    e.preventDefault();
    setErrors({});

    const title = titleRef.current.value;
    const description = descriptionRef.current.value;
    const dueDate = dueDateRef.current.value;

    const valRes = validateForm(title, description, dueDate);
    if (valRes) {
      setErrors(valRes);
    }
  }

  return createPortal(
    <>
      <div
        className='fixed inset-0 z-40 bg-opacity-75 bg-black/70 backdrop-blur-sm'
        onClick={toggleModal}
      />
      <dialog
        open={showModal}
        className='flex flex-col project-modal'
        // onClose={toggleModal}
      >
        <form
          className='flex flex-col group-hover:bg-amber-700'
          method='dialog'
          action=''
          onSubmit={handleSubmit}
        >
          <div className={style.inputWrapper}>
            {errors?.title && <p className='text-red-500'>{errors?.title}</p>}
            <input
              ref={titleRef}
              className={style.input}
              id='title'
              type='text'
              required
              placeholder='Enter title...'
            />
            <label htmlFor='title' className={style.label}>
              Title:
            </label>
          </div>
          <div className={style.inputWrapper}>
            {errors?.description && (
              <p className='text-red-500'>{errors?.description}</p>
            )}

            <textarea
              ref={descriptionRef}
              className={style.input + " resize-none max-h-[150px]"}
              id='description'
              placeholder='Enter description...'
            />
            <label htmlFor='description' className={style.label}>
              Description:
            </label>
          </div>
          <div className={style.inputWrapper}>
            {errors?.dueDate && (
              <p className='text-red-500'>{errors?.dueDate}</p>
            )}
            <input
              ref={dueDateRef}
              className={style.input}
              id='dueDate'
              type='date'
              required
            />
            <label htmlFor='dueDate' className={style.label}>
              Due date:
            </label>
          </div>

          <button className={style.button}>Create new project</button>
          <div className={style.line}></div>
          <button
            className='absolute p-3 text-5xl transition-all duration-300 top-2 right-5 hover:scale-110 hover:font-semibold hover:text-custom-red'
            type='button'
            onClick={toggleModal}
          >
            ×
          </button>
        </form>
      </dialog>
    </>,
    document.getElementById("modal")
  );
}
