export default function validateForm(title, description, dueDate) {
  const newErrors = {};

  if (!title || title.trim().length < 2) {
    newErrors.title = "Title must be at least 2 characters";
  }

  if (!description || description.trim().length < 2) {
    newErrors.description = "Description must be at least 2 characters";
  }

  if (!dueDate) {
    newErrors.dueDate = "Please set the date";
  } else {
    const selectedDate = new Date(dueDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      newErrors.dueDate = "Due date cannot be in the past";
    }
  }

  return newErrors;
}
