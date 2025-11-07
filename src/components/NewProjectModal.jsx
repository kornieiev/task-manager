import { useRef } from "react";
import { createPortal } from "react-dom";

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
        className='fixed inset-0 bg-black/70 bg-opacity-75 backdrop-blur-sm z-40'
        onClick={toggleModal}
      />
      <dialog
        open={showModal}
        className='project-modal flex flex-col'
        // onClose={toggleModal}
      >
        <form
          className='flex flex-col group-hover:bg-amber-700'
          method='dialog'
          action=''
          onSubmit={handleModalClose}
        >
          <div className='flex flex-col-reverse'>
            <input
              ref={titleRef}
              className='peer/title border rounded-xl px-4 py-2 min-w-xl tracking-wide text-2xl'
              id='title'
              type='text'
              required
              placeholder='Enter title...'
            />
            <label
              htmlFor='title'
              className='peer-focus/title:text-emerald-600 peer-focus/title:scale-105 text-center text-xl mt-3 mb-1 tracking-wide uppercase text-black/70 font-bold transition-all duration-300'
            >
              Title:
            </label>
          </div>
          <div className='flex flex-col-reverse'>
            <input
              ref={descriptionRef}
              className='peer/title border rounded-xl px-4 py-2 min-w-xl tracking-wide text-2xl'
              id='description'
              type='text'
              placeholder='Enter description...'
            />
            <label
              htmlFor='description'
              className='peer-focus/title:text-emerald-600 peer-focus/title:scale-105 text-center text-xl mt-3 mb-1 tracking-wide uppercase text-black/70 font-bold transition-all duration-300'
            >
              Description:
            </label>
          </div>
          <div className='flex flex-col-reverse'>
            <input
              ref={dueDateRef}
              className='peer/title border rounded-xl px-4 py-2 min-w-xl tracking-wide text-2xl'
              id='dueDate'
              type='date'
              required
            />
            <label
              htmlFor='dueDate'
              className='peer-focus/title:text-emerald-600 peer-focus/title:scale-105 text-center text-xl mt-3 mb-1 tracking-wide uppercase text-black/70 font-bold transition-all duration-300'
            >
              Due date:
            </label>
          </div>

          <button className='peer/button tracking-wide uppercase mx-auto mt-10 px-8 py-4 bg-emerald-700 text-amber-200 rounded-xl text-2xl transition-all duration-300 hover:text-emerald-700 hover:bg-amber-200 hover:scale-105'>
            Close
          </button>
          <div className='mt-1 text-transparent mx-auto w-0 peer-hover/button:w-xl h-[3px] peer-hover/button:bg-emerald-700 border transition-all duration-500'></div>
        </form>
      </dialog>
    </>,
    document.getElementById("modal")
  );
}
