const taskList = document.querySelector("#task-list");
const addTaskBtn = document.querySelector("#add-task");

addTaskBtn.addEventListener("click", addTask);

function addTask(event) {
  event.preventDefault();
  const taskContainer = document.createElement("li");
  const deleteTaskBtn = document.createElement("button");
  const taskName = document.createElement("textarea");

  taskContainer.classList.add("task-container");
  deleteTaskBtn.classList.add("delete-btn");
  deleteTaskBtn.textContent = "x";
  taskName.rows = 1;
  taskName.placeholder = "item";

  taskList.append(taskContainer);
  taskContainer.appendChild(deleteTaskBtn);
  taskContainer.appendChild(taskName).focus();

  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: "smooth",
  });

  deleteTaskBtn.addEventListener("click", () => {
    taskContainer.remove();
  });

  const textareas = document.querySelectorAll("textarea"); // Corrected variable name
  textareas.forEach((textarea) => {
    textarea.addEventListener("input", () => {
      // Apply to individual textarea
      textarea.style.height = "auto"; // Reset height to allow shrinking
      textarea.style.height = `${textarea.scrollHeight}px`; // Set height to content
    });
  });
}
