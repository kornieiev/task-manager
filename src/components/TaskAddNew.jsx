export default function TaskAddNew({
  handleAddTask,
  errorMassage,
  enteredTask,
  handleTaskInputChange,
}) {
  return (
    <form
      className='relative flex items-center gap-6 mt-6 '
      onSubmit={handleAddTask}
      action='submit'
    >
      <input
        className={`${errorMassage ? " outline outline-custom-red" : null} relative px-3 py-2 bg-white border border-gray-300 rounded-xl h-fit w-3xl`}
        type='text'
        placeholder='Add new task here...'
        value={enteredTask}
        onChange={handleTaskInputChange}
      />

      <select
        className='py-2 text-center border-gray-300 py rounded-xl'
        defaultValue='low'
        // onChange={}
      >
        <option value='low'>Low</option>
        <option value='medium'>Medium</option>
        <option value='high'>High</option>
      </select>

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
  );
}
