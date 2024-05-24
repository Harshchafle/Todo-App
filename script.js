const todoform = document.querySelector('form');
const todoInput = document.querySelector('#todo-input');
const todoListUL = document.querySelector('#todo-list');

let allTodos = getTodos();
updateTodoList();

todoform.addEventListener("submit", function(e){
    e.preventDefault(); //used for page not to reload after submiting the task byh user
    addTodo();          // after submiting the task addTodo() function is called to add the given task in toodo list
})

function addTodo(){
    const todoText = todoInput.value.trim();
    const todoObject = {
        text: todoText,
        completed: false
    }
    if(todoText.length > 0){
        allTodos.push(todoObject);
        updateTodoList();
        todoInput.value = "";    
    }
}

function updateTodoList(){
    todoListUL.innerHTML = "";
    allTodos.forEach((todo,todoIndex)=>{
        todoItem = createTodoItem(todo, todoIndex);
        todoListUL.append(todoItem);
    })
}

function createTodoItem(todo,todoIndex){
    const todoId = "todo-"+todoIndex;
    const todoLI = document.createElement("li");
    const todoText = todo.text;
    todoLI.className = "todo";
    todoLI.innerHTML = `
            
                <input type="checkbox" id="${todoId}">
                <label class="custom-checkbox" for="${todoId}">
                    <svg fill="transparent" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                        <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/>
                    </svg>
                </label>
                <label for="${todoId}" class="todo-text">
                    ${todoText}
                </label>
                <button class="delete-button">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                        <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
                    </svg>
                </button>
            
    `;


    const deleteButton = todoLI.querySelector(".delete-button");
    deleteButton.addEventListener("click", () => {
        deleteTodoItems(todoIndex);
    })

    function deleteTodoItems(todoIndex){
        allTodos = allTodos.filter((_, i)=> i !== todoIndex);
        saveTodos();
        updateTodoList();
    }

    const checkbox = todoLI.querySelector("input");
    checkbox.addEventListener("change", ()=> {
        allTodos[todoIndex].completed = checkbox.checked;
        saveTodos();
    })
    checkbox.checked = todo.completed;
    return todoLI;
}

function saveTodos(){
    const todoJson = JSON.stringify(allTodos);
    localStorage.setItem("todos",todoJson);
}
function getTodos(){
    const todos = localStorage.getItem("todos") || "[]";
    return JSON.parse(todos);
}