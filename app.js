// Selectors
const todoInput = document.querySelector(".todo-input");
const todoBtn = document.querySelector(".todo-btn");
const todoList = document.querySelector(".todo-list");
const selectFilter = document.querySelector(".select-filter");

// Event Listeners
todoBtn.addEventListener('click', addTodo);
todoList.addEventListener("click", deleteCheck);
selectFilter.addEventListener("click", filterTodo);

// Function
function addTodo(event) {
    // Prevent form from submitting
    event.preventDefault();
    // Create Todo Div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo-div');

    // Create li
    const newTodo = document.createElement('li');
    newTodo.classList.add('todo-item');
    newTodo.innerText = todoInput.value;
    todoDiv.appendChild(newTodo);
    // Add todo to local storage
    saveLocalTodos(todoInput.value);
    // Create Trash BUTTON
    const trashButton = document.createElement('button');
    trashButton.innerHTML = "<i class='fa fa-trash'></i>";
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);

    // Create CHECK MARK BUTTON
    const completedButton = document.createElement('button');
    completedButton.innerHTML = "<i class='fa fa-check'></i>";
    completedButton.classList.add('complete-btn');
    todoDiv.appendChild(completedButton);


    // Append to ul list
    todoList.appendChild(todoDiv);

    // Clear Input value
    todoInput.value = "";

}


function deleteCheck(e) {
    const item = e.target;
    // trash
    if (item.classList.contains('trash-btn')) {
        const todo = item.parentElement;
        todo.remove();
    }

    // check mark 
    if (item.classList.contains("complete-btn")) {
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}

function filterTodo(e) {
    let option = e.target.value;
    const todoDivs = todoList.childNodes;
    console.log(todoList.childNodes);
    todoDivs.forEach(function (todoDiv) {
        switch (option) {
            case "all":
                todoDiv.style.display = "flex";
                break;
            case "completed":
                if (todoDiv.classList.contains("completed")) {
                    todoDiv.style.display = "flex";
                } else {
                    todoDiv.style.display = "none";
                }
                break;
            case "uncompleted":
                if (todoDiv.classList.contains("completed")) {
                    todoDiv.style.display = "none";
                } else {
                    todoDiv.style.display = "flex";
                }
                break;
        }
    })
}

function saveLocalTodos(todo) {
    // check if there's data in there
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
        // if no data exists in localStorage, create an array
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
        // if data exists in localStorage, turn that data into object
    }
    todos.push(todo);
    // add new data to the localStorage
    localStorage.setItem("todos", JSON.stringify(todos));
    // setItem in localStorage with key being "todos" and item with todos as string
}