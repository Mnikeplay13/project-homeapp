let todosArray;

class Todo {
    constructor (title, details, date, priority, checked) {

        this.title = title;
        this.details = details;
        this.date = date;
        this.priority = priority;
        this.checked = false;

    }
}

const getFormInput = () => {
    const title = document.getElementById("new-todo-title").value;
    const details = document.getElementById("new-todo-details").value;
    const date = document.getElementById("new-todo-date").value;
    const priority = document.querySelector('input[name="create-new-priority"]:checked').value;
    const checked = false;

    return new Todo(title, details, date, priority, checked);
}

const getEditInput = () => {
    const editTitle = document.getElementById("edit-todo-title").value;
    const editDetails = document.getElementById("edit-todo-details").value;
    const editDate = document.getElementById("edit-todo-date").value;
    const editPriority = document.querySelector('input[name="create-edit-priority"]:checked').value;
    const editChecked = false;

    return new Todo(editTitle, editDetails, editDate, editPriority, editChecked);
}



const saveTodosLocally = () => {
 
    if (localStorage.getItem("todos") === null) {
        todosArray = [];
    }

    else {
        todosArray = JSON.parse(localStorage.getItem("todos"));
    }
}

const toggleCheckbox = (title) => {
    saveTodosLocally();

    let index = todosArray.findIndex(id => id.title == title);
    todosArray[index].checked = !todosArray[index].checked;

    localStorage.setItem("todos", JSON.stringify(todosArray));

    return todosArray[index].checked;
}

const removeToDo = (title) => {
    
    saveTodosLocally();

    let index = todosArray.findIndex(id => id.title == title);
    todosArray.splice(index, 1);
    console.log(index);
    
    localStorage.setItem("todos", JSON.stringify(todosArray));
}

const addEdit = (title) => {
    
    let editObj = getEditInput();

    saveTodosLocally();

    let index = todosArray.findIndex(id => id.title == title);
    todosArray[index] = editObj;
    
    
    localStorage.setItem("todos", JSON.stringify(todosArray));

    
}


const addTodo = () => {
    
    let todoObj = getFormInput();

    saveTodosLocally();

    todosArray.push(todoObj);
    localStorage.setItem("todos", JSON.stringify(todosArray));
    return todosArray;
}

export {
    addTodo,
    removeToDo,
    addEdit,
    toggleCheckbox
};
