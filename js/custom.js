// Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

// Event Listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

// Functions
function addTodo(event) {
  // Prevent form from submitting

  event.preventDefault();

  //   Todo DIV
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  //   Create LI
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);

  // SAVE TODOS to LOCAL STORAGE
  saveLocalTodos(todoInput.value);

  //   CHECK MARK BUTTON
  const completedButton = document.createElement("button");
  completedButton.innerHTML = "<i class='fa fa-check'></i>";
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);

  //   CHECK TRASH BUTTON
  const trashButton = document.createElement("button");
  trashButton.innerHTML = "<i class='fa fa-trash'></i>";
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);

   //   Inprgress BUTTON
   const progressButton = document.createElement("button");
   progressButton.innerHTML = "<i class='fa fa-spinner'></i>";
   progressButton.classList.add("progress-btn");
   todoDiv.appendChild(progressButton);

  //   APPEND TO LIST
  todoList.appendChild(todoDiv);

  // CLEAR TODO INPUT VALUE
  todoInput.value = "";
}

function deleteCheck(e) {
  const item = e.target;
  // DELETE TODO
  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    // Animation
    todo.classList.add("fall");
    removeLocalTodos(todo);
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }

  //   CHECK MARK

  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }

    //   CHECK MARK

    if (item.classList[0] === "progress-btn") {
      const todo1 = item.parentElement;
      todo1.classList.toggle("inprogress");
    }
}

function filterTodo(e) {
  const todos = todoList.childNodes;
  // console.log(todos);
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          console.log('completed');
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "incomplete":
        if (!todo.classList.contains("completed") && !todo.classList.contains("inprogress")) {
          console.log('incomplete');
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
        case "inprogress":
        if (todo.classList.contains("inprogress") ) {
          console.log('inprogress');
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

function saveLocalTodos(todo) {
  // CHECK  if TODOS are present in local storage

  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.push(todo);

  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  // CHECK  if TODOS are present in local storage

  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.forEach(function (todo) {
    //   Todo DIV
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //   Create LI
    const newTodo = document.createElement("li");

    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    //   CHECK MARK BUTTON
    const completedButton = document.createElement("button");
    completedButton.innerHTML = "<i class='fa fa-check'></i>";
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    //   CHECK TRASH BUTTON
    const trashButton = document.createElement("button");
    trashButton.innerHTML = "<i class='fa fa-trash'></i>";
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

      //   Inprgress BUTTON
      const progressButton = document.createElement("button");
      progressButton.innerHTML = "<i class='fa fa-spinner'></i>";
      progressButton.classList.add("progress-btn");
      todoDiv.appendChild(progressButton);

    //   APPEND TO LIST
    todoList.appendChild(todoDiv);
  });
}

function removeLocalTodos(todo) {
  // CHECK  if TODOS are present in local storage

  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
