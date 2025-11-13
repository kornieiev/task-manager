export default function TaskList({ projects, activeTask, handleActiveTask }) {
  return (
    <div className='flex flex-col gap-6 mt-6'>
      <ul className='flex flex-col gap-3 '>
        {projects.map((project) => {
          const isActive = activeTask === project.id;
          return (
            <li
              key={project.id}
              onClick={() => handleActiveTask(project.id)}
              className={`flex gap-3 text-2xl  font-medium capitalize transition-all duration-300 cursor-pointer ${
                isActive ? "translate-x-2" : undefined
              } text-black/60 hover:text-black`}
            >
              <span
                className={`text-[1rem] pt-2 ${
                  isActive ? " text-black" : undefined
                }`}
              >
                {isActive ? "✍🏻" : `${project.status ? "✅" : "❌"}`}
              </span>
              <span
                className={`transition-all duration-300 hover:text-black ${
                  isActive ? "text-black font-bold" : "text-black/70"
                }`}
              >
                {project.projectTitle}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
