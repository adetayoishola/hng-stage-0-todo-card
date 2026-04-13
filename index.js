const dueDate = new Date("2026-04-16T23:59:59");

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
  let message = "";
  if (diffDays > 1) {
    message = `Due in ${diffDays} days`;
  } else if (diffDays === 1) {
    message = "Due tomorrow";
  } else {
    message = "Due today!";
  }

  timeEl.textContent = message;
}

calculateTimeRemaining();
setInterval(calculateTimeRemaining, 30000);

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

function editTodo() {
  alert("Edit button clicked!");
}

function deleteTodo() {
  if (confirm("Delete this task?")) {
    alert("Task deleted!");
  }
}