//let todolist = [
 //   {
 //       text: "Learn HTML",
 //       uniqueNo: 1
 //   },

  //  {
  //      text: "Learn CSS",
  //      uniqueNo: 2
  //  },

  //  {
  //      text: "Learn JavaScript",
  //      uniqueNo: 3
  //  }
//];

let todoItemsContainerEl = document.getElementById("todoItemsContainer");
let addTodoButton = document.getElementById("addTodoButton");
let saveTodoButton = document.getElementById("saveTodoButton");

//getting data from the local storage
function getTodoListFromLocalStorage(){
    let stringifiedTodoList = localStorage.getItem("todolist");
    let parsedTodoList = JSON.parse(stringifiedTodoList);

    if (parsedTodoList === null){
        return [];
    }else {
        return parsedTodoList;
    }
}

// new todo list which is fetched from the local storage
let todolist = getTodoListFromLocalStorage();

//saving the data into the local Storage
saveTodoButton.onclick = function(){
    localStorage.setItem("todolist" , JSON.stringify(todolist));
};

// Function used to check the status of the checkbox 
function onTodoStatusChange(checkboxId , labelId , todoId){
    let checkboxElement = document.getElementById(checkboxId);
    let labelElement = document.getElementById(labelId);
    //if (checkboxElement.checked === true){
    //    labelElement.classList.add("checked");
    //}else{
    //    labelElement.classList.remove("checked");
    //}
    labelElement.classList.toggle("checked");

    let todoObjectIndex = todolist.findIndex(function(eachTodo){
        let eachTodoId = "todo" + eachTodo.uniqueNo;
        if(eachTodoId === todoId){
            return true;
        }else{
            return false;
        }
    });
    let todoObject = todolist[todoObjectIndex];
    if(todoObject === true){
        todoObject.isChecked = false;
    }else{
        todoObject.isChecked = true;
    }
}

// Functin used to remove the deleted todo item
function onDeleteTodo(todoId){
    let todoElement = document.getElementById(todoId);
    todoItemsContainerEl.removeChild(todoElement);

    let deleteELementIndex = todolist.findIndex(function(eachTodo){
        let eachTodoId = "todo" + eachTodo.uniqueNo;
        if(eachTodoId === todoId){
            return true;
        }else{
            return false;
        }
    });
    todolist.splice(deleteELementIndex, 1);
}


// Main function which creates Todo Items
function createAndAppendTodo(todo){
    let checkboxId = "checkbox" + todo.uniqueNo;
    let labelId = "label" + todo.uniqueNo;
    let todoId = "todo" + todo.uniqueNo;
    
    let todoElement = document.createElement("li");
    todoElement.classList.add("todo-item-container" , "d-flex" , "flex-row");
    todoElement.id = todoId;
    todoItemsContainerEl.appendChild(todoElement);

    let inputElement = document.createElement("input");
    inputElement.type = "checkbox";
    inputElement.classList.add("checkbox-input");
    inputElement.id = checkboxId;
    inputElement.checked = todo.isChecked;

    inputElement.onclick = function(){
        onTodoStatusChange(checkboxId , labelId , todoId);
    };
    todoElement.appendChild(inputElement);

    let labelContainer = document.createElement("div");
    labelContainer.classList.add("d-flex" , "flex-row" , "justify-content-between" , "label-container");
    todoElement.appendChild(labelContainer);

    let labelElement = document.createElement("label");
    labelElement.classList.add("checkbox-label");
    labelElement.setAttribute("for", checkboxId);
    labelElement.textContent = todo.text;
    labelElement.id = labelId;
    if (todo.isChecked === true){
        labelElement.classList.add("checked");
    }
    labelContainer.appendChild(labelElement);

    let deleteContainer = document.createElement("div");
    deleteContainer.classList.add("delete-icon-container");
    labelContainer.appendChild(deleteContainer);

    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("fa-solid", "fa-trash");
    deleteIcon.onclick = function(){
        onDeleteTodo(todoId);
    }
    deleteContainer.appendChild(deleteIcon);
}


// To fetch the data from the user given input
function onAddTodo(){
    let userInputElement = document.getElementById("user-input");
    let userInputValue = userInputElement.value;
    let todoCount = todolist.length;

    if(userInputValue === ""){
        alert("Enter Valid Text");
        return;
    }

    todoCount = todoCount + 1;
    let newTodo = {
        text: userInputValue,
        uniqueNo: todoCount,
        isChecked: false
    };
    createAndAppendTodo(newTodo);

    //adding newly added items into the local storage
    todolist.push(newTodo);
    userInputElement.value = "";
}

// Button function
addTodoButton.onclick = function(){
    onAddTodo();
}

// Iterating each item present in the todoList object
for (let eachItem of todolist){
    createAndAppendTodo(eachItem);
};