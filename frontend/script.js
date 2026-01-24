const API = "http://localhost:5000/tasks";
let editIndex = null;

// Load tasks on page load
function loadTasks() {
  fetch(API)
    .then(res => res.json())
    .then(data => {
      const list = document.getElementById("taskList");
      list.innerHTML = "";

      data.forEach((task, index) => {
        list.innerHTML += `
          <li>
            <span>${task}</span>
            <div class="task-actions">
              <button class="edit" onclick="openEditModal(${index})">✏️</button>
              <button class="delete" onclick="deleteTask(${index})">🗑</button>
            </div>
          </li>
        `;
      });
    });
}

// Add task
function addTask() {
  const input = document.getElementById("taskInput");
  if (!input.value.trim()) return;

  fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ task: input.value })
  }).then(() => {
    input.value = "";
    loadTasks();
  });
}

// Delete task
function deleteTask(index) {
  fetch(`${API}/${index}`, { method: "DELETE" })
    .then(loadTasks);
}

// Open edit modal
function openEditModal(index) {
  editIndex = index;
  document.getElementById("editInput").value =
    document.querySelectorAll("#taskList li span")[index].innerText;

  document.getElementById("editModal").classList.remove("hidden");
}

// Close modal
function closeModal() {
  document.getElementById("editModal").classList.add("hidden");
}

// Save edited task
function saveEdit() {
  const updatedTask = document.getElementById("editInput").value;
  if (!updatedTask.trim()) return;

  fetch(`${API}/${editIndex}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ task: updatedTask })
  }).then(() => {
    closeModal();
    loadTasks();
  });
}

// Initial load
loadTasks();
