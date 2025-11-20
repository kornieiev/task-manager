export default function TaskAddNew({
  handleAddTask,
  errorMassage,
  enteredTask,
  handleTaskInputChange,
  priority,
  setPriority,
}) {
  function getSelectorBgColor() {
    switch (priority) {
      case "low":
        return "bg-green-500/70";
      case "medium":
        return "bg-yellow-500/70";
      case "high":
        return "bg-red-500/70";

      default:
        return "bg-white";
    }
  }

  function onSelectChange(e) {
    setPriority(e.target.value);
  }
  return (
    <form
      className='relative flex items-center h-12 gap-2 mt-6 justify-evenly'
      onSubmit={handleAddTask}
      action='submit'
    >
      <input
        className={`${errorMassage ? " outline outline-custom-red" : null} relative px-3 py-2 bg-white border border-gray-300 rounded-xl h-full w-8/12 `}
        type='text'
        placeholder='Add new task here...'
        value={enteredTask}
        onChange={handleTaskInputChange}
      />

      <select
        className={`${getSelectorBgColor()} py-2 px-2 outline text-center outline-gray-300 rounded-xl h-full`}
        defaultValue='low'
        onChange={onSelectChange}
        value={priority}
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
        className='h-full px-4 py-2 text-lg font-medium transition-all duration-300 bg-white cursor-pointer text-shadow-md hover:bg-amber-200 text-black/80 rounded-xl hover:outline hover:outline-gray-300 hover:text-emerald-700'
        type='submit'
      >
        + Add task
      </button>
    </form>
  );
}
