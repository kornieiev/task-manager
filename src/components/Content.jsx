import { useState, useEffect } from "react";
import Task from "./Task";
import TaskAddNew from "./TaskAddNew";
import TaskHeader from "./TaskHeader";

export default function Content({
  currentTask,
  addNewTask,
  enteredTask,
  setEnteredTask,
  approveDelete,
  setApproveDelete,
  removeProject,
  removeTask,
  onTaskComplittedChange,
}) {
  const [errorMassage, setErrorMessage] = useState("");
  const [confirmDeleteProject, setConfirmDeleteProject] = useState(false);
  const [priority, setPriority] = useState("low");

  function handleAddTask(e) {
    e.preventDefault();
    if (enteredTask.length < 2) {
      setErrorMessage(
        "Please enter a value with at least 2 characters in length"
      );
      return;
    }

    addNewTask(currentTask[0].id, enteredTask, priority);
    setEnteredTask("");
  }

  function handleTaskInputChange(e) {
    setEnteredTask(e.target.value);
    setErrorMessage("");
  }

  function handleDeleteTask() {
    setConfirmDeleteProject((prev) => !prev);
  }

  useEffect(() => {
    setConfirmDeleteProject(false);
    setPriority("low");

    return () => {
      setConfirmDeleteProject(false);
      setPriority("low");
    };
  }, [currentTask]);

  return (
    <section className='h-full p-8 '>
      <TaskHeader
        currentTask={currentTask}
        confirmDeleteProject={confirmDeleteProject}
        setConfirmDeleteProject={setConfirmDeleteProject}
        removeProject={removeProject}
        handleDeleteTask={handleDeleteTask}
      />
      <TaskAddNew
        handleAddTask={handleAddTask}
        errorMassage={errorMassage}
        enteredTask={enteredTask}
        handleTaskInputChange={handleTaskInputChange}
        priority={priority}
        setPriority={setPriority}
      />

      {currentTask[0].projectTasks.length > 0 ? (
        <Task
          currentTask={currentTask}
          approveDelete={approveDelete}
          setApproveDelete={setApproveDelete}
          removeTask={removeTask}
          onTaskComplittedChange={onTaskComplittedChange}
        />
      ) : (
        <p className='text-2xl text-center mt-18 text-custom-red/80'>
          There are no created tasks yet.
        </p>
      )}
    </section>
  );
}
