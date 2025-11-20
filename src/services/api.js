async function fetchProjects() {
  try {
    const response = await fetch("http://localhost:3003/api/projects");
    const projects = await response.json();
    return projects;
  } catch (error) {
    console.error("Ошибка загрузки проектов:", error);
  }
}

async function createTask(projectId, taskText) {
  try {
    const response = await fetch(
      `http://localhost:3003/api/tasks/${projectId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ taskText }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to create task");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Ошибка создания задачи:", error);
    throw error;
  }
}

async function deleteTask(projectId, taskId) {
  try {
    const response = await fetch(
      `http://localhost:3003/api/tasks/${projectId}/${taskId}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to delete task");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Ошибка удаления задачи:", error);
    throw error;
  }
}

async function toggleTask(projectId, taskId, completed) {
  try {
    const response = await fetch(
      `http://localhost:3003/api/tasks/${projectId}/${taskId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ completed }),
      }
    );
    if (!response.ok) {
      throw new Error("Failed to toggle task");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Ошибка тогла задачи:", error);
    throw error;
  }
}

async function createProject(title, description, due_date) {
  try {
    const response = await fetch("http://localhost:3003/api/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description, due_date }),
    });

    if (!response.ok) {
      throw new Error("Failed to create project");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Ошибка создания проекта:", error);
    throw error;
  }
}

async function deleteProject(id) {
  try {
    const response = await fetch(`http://localhost:3003/api/projects/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete project");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Ошибка удаления проекта:", error);
    throw error;
  }
}

export {
  fetchProjects,
  createProject,
  deleteProject,
  createTask,
  toggleTask,
  deleteTask,
};
