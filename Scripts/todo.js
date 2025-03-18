let descriptionVisible = false;
let isWhiteBackground = true;

function LoadData() {
    const savedToDos = JSON.parse(localStorage.getItem('todoList')) || [];
    savedToDos.forEach(todo => {
        AddToList(todo.text, todo.description);
    });
}

document.addEventListener("DOMContentLoaded", function () {
    // Initialize to-do list from localStorage if it exists
    LoadData();
    
    // Handle formatting in the description textarea
    document.getElementById('description-input').addEventListener('keydown', (e) => {
        const input = e.target;
        const cursorPosition = input.selectionStart;

        // When user presses Enter -> add new dash
        if (e.key === 'Enter') {
            e.preventDefault();
            // Get current value and add a new dash
            const value = input.value;
            let newValue = value.slice(0, cursorPosition) + '\n- ' + value.slice(cursorPosition);
            if (newValue === "\n- ") {
                newValue = "- ";//value.slice(0, cursorPosition) + '- ' + value.slice(cursorPosition);
            }
            input.value = newValue;
            input.selectionStart = input.selectionEnd = cursorPosition + 3;
        }

        // When user presses Tab -> indent to sub-pointer
        if (e.key === 'Tab') {
            e.preventDefault();

            // Get current value and add indentation
            const value = input.value;
            const newValue = value.slice(0, cursorPosition) + '\t- ' + value.slice(cursorPosition);

            input.value = newValue;
            input.selectionStart = input.selectionEnd = cursorPosition + 4;
        }
    });
});

// Add to-do item to the list (placeholder for functionality)
function AddToDo() {
    const todoInput = document.getElementById('todo-input').value.trim();
    const descriptionInput = document.getElementById('description-input').value.trim();

    if (todoInput !== "") {
        // Save to-do item locally
        const todo = { text: todoInput, description: descriptionInput, backgroundColor: isWhiteBackground ? 'white' : 'wheat' };
        AddToList(todo.text, todo.description);
        
        // Save the updated list to localStorage
        saveToLocalStorage();

        // Clear input fields
        document.getElementById('todo-input').value = '';
        document.getElementById('description-input').value = '';
    }
}

// Function to add to-do to the list and apply background
function AddToList(task, todoDescription) {
    const todoList = document.getElementById('todo-list');

    // Create a new list item
    const listItem = document.createElement('li');
    listItem.classList.add('todo-item');
    listItem.style.backgroundColor = 'white';

    // Create clickable title
    const title = document.createElement('div');
    title.classList.add('todo-title');
    title.textContent = task;

    // Create description element if it exists
    let description = null;
    if (todoDescription !== "") {
        description = document.createElement('div');
        description.classList.add('todo-description');
        description.textContent = todoDescription;

        // Add click event to show/hide description
        title.addEventListener('click', () => {
            const isVisible = description.style.display === 'block';
            description.style.display = isVisible ? 'none' : 'block';
        });
    }

    // Create delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.onclick = () => {
        listItem.remove(); // Remove task from DOM
        saveToLocalStorage(); // Update localStorage
    };

    // Add title and description to the list item
    listItem.appendChild(title);
    if (description) listItem.appendChild(description);
    listItem.appendChild(deleteBtn);

    // Add list item to the todo list
    todoList.appendChild(listItem);
}

// Save the current to-do list to localStorage
function saveToLocalStorage() {
    const todoListItems = document.querySelectorAll('.todo-item');
    const todoListArray = Array.from(todoListItems).map(item => {
        const title = item.querySelector('.todo-title').textContent;
        const description = item.querySelector('.todo-description') ? item.querySelector('.todo-description').textContent : "";
        const backgroundColor = item.style.backgroundColor;
        return { text: title, description: description, backgroundColor: backgroundColor };
    });
    localStorage.setItem('todoList', JSON.stringify(todoListArray));
}

// Toggle visibility of the description textarea
function toggleDescription() {
    const descriptionInput = document.getElementById('description-input');
    descriptionVisible = !descriptionVisible;
    descriptionInput.style.display = descriptionVisible ? 'block' : 'none';
    /* descriptionInput.value = '- '; */
}

// Toggle background color of .addBar
function toggleBackground() {
    const addBar = document.querySelector('.addBar');
    isWhiteBackground = !isWhiteBackground;
    addBar.style.backgroundColor = isWhiteBackground ? 'white' : 'wheat';
}