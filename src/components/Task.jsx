// import { toggleTask } from "../services/api";

export default function Task({
  currentTask,
  approveDelete,
  setApproveDelete,
  removeTask,
  onTaskComplittedChange,
}) {
  console.log("currentTask[0].projectTasks", currentTask[0].projectTasks);
  function getTaskPriorityColor(color) {
    switch (color) {
      case "low":
        return "border-green-500";
      case "medium":
        return "border-yellow-500";
      case "high":
        return "border-red-500";
      default:
        break;
    }
  }

  return (
    <ul className='flex flex-col gap-2 mt-4'>
      <p className='text-2xl text-custom-red/80'>Tasks:</p>

      {currentTask[0].projectTasks
        .sort((a, b) => a.id - b.id)
        .map((task, idx) => {
          return (
            <li className='flex flex-row items-center gap-3' key={task.id}>
              <input
                className='w-6 h-6 cursor-pointer'
                type='checkbox'
                checked={task.completed}
                onChange={() =>
                  onTaskComplittedChange(
                    currentTask[0].id,
                    task.id,
                    !task.completed
                  )
                }
              />

              <p
                className={`h-[42px] flex-1 max-w-8/12 px-4 py-2 bg-white border border-gray-200 rounded-xl ${getTaskPriorityColor(task.priority)}`}
                type='text'
              >
                {task.title}
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
                    onClick={() => {
                      removeTask(currentTask[0].id, task.id);
                      setApproveDelete([]);
                    }}
                  >
                    Delete
                  </button>
                </>
              )}
            </li>
          );
        })}
    </ul>
  );
}
