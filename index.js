const dueDate = new Date("2026-04-17T23:59:59"); 

let originalValues = {};

// ==================== TIME REMAINING ====================
function calculateTimeRemaining() {
  const now = new Date();
  const diffMs = dueDate - now;
  const timeEl = document.querySelector('[data-testid="test-todo-time-remaining"]');

  if (diffMs <= 0) {
    timeEl.textContent = "Overdue!";
    timeEl.style.backgroundColor = "#fee2e2";
    timeEl.style.color = "#ef4444";
    return;
  }

  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

  let message = "";
  if (diffDays >= 2) message = `Due in ${diffDays} days`;
  else if (diffDays === 1) message = "Due tomorrow";
  else if (diffHours >= 1) message = `Due in ${diffHours} hours`;
  else message = "Due soon!";

  timeEl.textContent = message;
}

// ==================== CHECKBOX ====================
function toggleComplete() {
  const title = document.querySelector('[data-testid="test-todo-title"]');
  const status = document.querySelector('[data-testid="test-todo-status"]');
  const checkbox = document.getElementById('complete-toggle');

  if (checkbox.checked) {
    title.classList.add('completed');
    status.textContent = "Done";
  } else {
    title.classList.remove('completed');
    status.textContent = "In Progress";
  }
}

// ==================== STATUS DROPDOWN ====================
function changeStatus(select) {
  const statusEl = document.querySelector('[data-testid="test-todo-status"]');
  const checkbox = document.getElementById('complete-toggle');

  statusEl.textContent = select.value;

  if (select.value === "Done") {
    checkbox.checked = true;
    document.querySelector('[data-testid="test-todo-title"]').classList.add('completed');
  } else {
    checkbox.checked = false;
    document.querySelector('[data-testid="test-todo-title"]').classList.remove('completed');
  }
}

// ==================== EDIT MODE ====================
function enterEditMode() {
  const editForm = document.getElementById('edit-form');
  editForm.style.display = "block";

  originalValues = {
    title: document.querySelector('[data-testid="test-todo-title"]').textContent,
    description: document.querySelector('[data-testid="test-todo-description"]').textContent,
    priority: document.querySelector('[data-testid="test-todo-priority"]').textContent
  };

  document.getElementById('edit-title').value = originalValues.title;
  document.getElementById('edit-description').value = originalValues.description;
  document.getElementById('edit-priority').value = originalValues.priority;
}

function saveEdit() {
  const newTitle = document.getElementById('edit-title').value.trim();
  const newDescription = document.getElementById('edit-description').value.trim();
  const newPriority = document.getElementById('edit-priority').value;

  if (newTitle) document.querySelector('[data-testid="test-todo-title"]').textContent = newTitle;
  if (newDescription) document.querySelector('[data-testid="test-todo-description"]').textContent = newDescription;
  document.querySelector('[data-testid="test-todo-priority"]').textContent = newPriority;

  cancelEdit();
}

function cancelEdit() {
  document.getElementById('edit-form').style.display = "none";
}

// ==================== EXPAND / COLLAPSE ====================
function toggleExpand() {
  const collapsible = document.querySelector('[data-testid="test-todo-collapsible-section"]');
  const btn = document.querySelector('[data-testid="test-todo-expand-toggle"]');

  if (collapsible.style.display === "block") {
    collapsible.style.display = "none";
    btn.textContent = "Show More";
  } else {
    collapsible.style.display = "block";
    btn.textContent = "Show Less";
  }
}

// ==================== DELETE ====================
function deleteTodo() {
  if (confirm("Are you sure you want to delete this task?")) {
    alert("Task has been deleted!");
  }
}

document.addEventListener('DOMContentLoaded', () => {
  calculateTimeRemaining();
  setInterval(calculateTimeRemaining, 30000);
});
