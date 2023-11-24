let tasks = [];

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (taskText !== '') {
        const newTask = {
            text: taskText,
            priority: false,
            completed: false,
        };

        tasks.unshift(newTask); // Add new tasks to the beginning of the list
        displayTasks();
        saveTasksToLocalStorage();
        taskInput.value = '';
    }
}

function deleteTask(index) {
    tasks.splice(index, 1);
    displayTasks();
    saveTasksToLocalStorage();
}

function togglePriority(index) {
    tasks[index].priority = !tasks[index].priority;
    displayTasks();
    saveTasksToLocalStorage();
}

function toggleCompletion(index) {
    tasks[index].completed = !tasks[index].completed;
    displayTasks();
    saveTasksToLocalStorage();
}

function editTask(index, newText) {
    tasks[index].text = newText;
    tasks[index].editMode = false; // Set edit mode to false after editing
    displayTasks();
    saveTasksToLocalStorage();
}


function displayTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        const li = document.createElement('li');

        if (task.completed) {
            li.classList.add('completed');
        }

        // Display task text or input field for editing
        if (task.editMode) {
            const input = document.createElement('input');
            input.type = 'text';
            input.value = task.text;
            input.addEventListener('keyup', (event) => {
                if (event.key === 'Enter') {
                    editTask(index, input.value);
                }
            });

            li.classList.add('edit-mode');
            li.appendChild(input);
        } else {
            li.textContent = task.text;
        }

        // Display priority indicator
        if (task.priority) {
            const prioritySpan = document.createElement('span');
            prioritySpan.textContent = 'Priority';
            prioritySpan.className = 'priority';
            li.appendChild(prioritySpan);
        }

        // Display delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteTask(index);
        li.appendChild(deleteButton);

        // Display toggle priority button
        const togglePriorityButton = document.createElement('button');
        togglePriorityButton.textContent = task.priority ? 'Unmark' : 'Mark Priority';
        togglePriorityButton.onclick = () => togglePriority(index);
        li.appendChild(togglePriorityButton);

        // Display toggle completion button
        const toggleCompletionButton = document.createElement('button');
        toggleCompletionButton.textContent = task.completed ? 'Undo' : 'Complete';
        toggleCompletionButton.onclick = () => toggleCompletion(index);
        li.appendChild(toggleCompletionButton);

        // Display edit button
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.onclick = () => {
            tasks.forEach((t) => (t.editMode = false)); // Close edit mode for other tasks
            task.editMode = true;
            displayTasks();
        };
        li.appendChild(editButton);

        taskList.appendChild(li);
    });
}

function saveTasksToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasksFromLocalStorage() {
    const storedTasks = localStorage.getItem('tasks');
    tasks = storedTasks ? JSON.parse(storedTasks) : [];
}

// Load tasks from local storage on page load
loadTasksFromLocalStorage();

// Display tasks on page load
displayTasks();
