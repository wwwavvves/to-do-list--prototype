document.addEventListener("DOMContentLoaded", loadTasks);

const taskList = document.querySelector("#task-list");
const addTaskBtn = document.querySelector("#add-task");

addTaskBtn.addEventListener("click", addTask);

function addTask(event) {
  event.preventDefault();
  createTaskElement();
  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: "smooth",
  });
}

function createTaskElement(task = "") {
  const taskContainer = document.createElement("li");
  const deleteTaskBtn = document.createElement("button");
  const taskName = document.createElement("textarea");

  taskContainer.classList.add("task-container");
  deleteTaskBtn.classList.add("delete-btn");
  deleteTaskBtn.textContent = "x";
  taskName.rows = 1;
  taskName.placeholder = "item/task";
  taskName.value = task;

  taskList.append(taskContainer);
  taskContainer.appendChild(deleteTaskBtn);
  taskContainer.appendChild(taskName).focus();

  adjustTextareaHeight(taskName);
  setEventListeners(taskContainer, taskName, deleteTaskBtn);

  return taskContainer;
}

function adjustTextareaHeight(textarea) {
  textarea.style.height = "auto"; // Reset height to allow shrinking
  textarea.style.height = `${textarea.scrollHeight}px`; // Set height to content
}

function setEventListeners(taskContainer, taskName, deleteTaskBtn) {
  deleteTaskBtn.addEventListener("click", () => {
    taskContainer.remove();
    saveTasks();
  });

  taskName.addEventListener("input", () => {
    adjustTextareaHeight(taskName);
    saveTasks();
  });

  // Detect Enter key press to create a new task
  taskName.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent the new line in textarea
      addTask(event); // Call the function to add a new task
    }
  });
}

function saveTasks() {
  const tasks = [];
  document.querySelectorAll("#task-list textarea").forEach((element) => {
    const trimmedValue = element.value.trim(); // Trim whitespace
    if (trimmedValue !== "") {
      tasks.push(trimmedValue); // Only save non-empty tasks
    }
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const tasksString = localStorage.getItem("tasks");
  if (tasksString) {
    const tasks = JSON.parse(tasksString).filter((task) => task.trim() !== ""); // Ignore empty tasks
    tasks.forEach((task) => {
      createTaskElement(task);
    });
  }
}
