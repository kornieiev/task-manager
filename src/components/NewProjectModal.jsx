import { useRef } from "react";
import { createPortal } from "react-dom";

const style = {
  label:
    "mt-3 mb-1 text-2xl font-bold tracking-wide text-center uppercase transition-all duration-300 peer-focus/title:text-emerald-600 peer-focus/title:scale-105 text-black/70",
  input:
    "px-4 py-2 text-2xl tracking-wide border peer/title rounded-xl min-w-xl outline-none focus:scale-105 duration-300 transition-all",
  inputWrapper: "mt-4 flex flex-col-reverse ",
  button:
    "px-8 py-4 mx-auto mt-12 text-2xl tracking-wide uppercase transition-all my-5 duration-300 peer/button bg-emerald-700 text-amber-200 rounded-xl hover:text-emerald-700 hover:bg-amber-200 hover:scale-105",
  line: "mt-4 text-transparent mx-auto w-0 peer-hover/button:w-xl h-[3px] peer-hover/button:bg-emerald-700 border transition-all duration-1000",
};

export default function NewProjectModal({
  showModal,
  toggleModal,
  addNewProject,
}) {
  const titleRef = useRef();
  const descriptionRef = useRef();
  const dueDateRef = useRef();

  if (!showModal) return null;

  function handleModalClose() {
    toggleModal();
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
          onSubmit={handleModalClose}
        >
          <div className={style.inputWrapper}>
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
            <input
              ref={descriptionRef}
              className={style.input}
              id='description'
              type='text'
              placeholder='Enter description...'
            />
            <label htmlFor='description' className={style.label}>
              Description:
            </label>
          </div>
          <div className={style.inputWrapper}>
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

          <button className={style.button}>Close</button>
          <div className={style.line}></div>
        </form>
      </dialog>
    </>,
    document.getElementById("modal")
  );
}
