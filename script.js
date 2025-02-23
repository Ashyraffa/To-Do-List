
// References from HTML
const todoInput = document.getElementById('todo-input');
const addButton = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');

// To add a new task
function addTask () {
    const taskText = todoInput.value.trim();
    if (taskText === "") return; // If input is empty then dont add

    const li = document.createElement('li'); // Create a new list
    li.textContent = taskText; // Set the text of the task itself
 
    // Remove button for the task:
    const removeBtn = document.createElement('button');
    removeBtn.textContent = "X";
    removeBtn.classList.add('remove-btn');
    removeBtn.onclick = function () {
        li.remove(); // Remove the task
        saveTasks(); // Save tasks after removal
    };

    // Append the remove button to da list:
    li.appendChild(removeBtn);

    // Append a new task to da list:
    todoList.appendChild(li);

    todoInput.value = ""; // Clear the input field

    saveTasks(); // Save Tasks to Local Storage
}

// Saving Tasks to Local Storage:
function saveTasks () {
    const tasks = [];
    const taskItems = todoList.querySelectorAll('li');
    taskItems.forEach(item => {
        tasks.push(item.textContent.replace("X", "").trim());
    });

    localStorage.setItem('todos', JSON.stringify(tasks)); // Save to Local Storage
}

// Load the task from Local Storage to page:
function loadTasks () {
    const tasks = JSON.parse(localStorage.getItem('todos')) || [];
    tasks.forEach(taskText => {
        const li = document.createElement('li');
        li.textContent = taskText;
    })

    const removeBtn = document.createElement('button');
    removeBtn.textContent = "X";
    removeBtn.classList.add('remove-btn');
    removeBtn.onclick = function () {
        li.remove();
        saveTasks();
    };

    li.appendChild(removeBtn);
    todoList.appendChild(li);
}

// Event Listener for "Add" button:
addButton.addEventListener('click', addTask);

// Load existing tasks when the page loads:
window.onload = loadTasks;