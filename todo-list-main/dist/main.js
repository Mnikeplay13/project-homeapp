const main = document.getElementById("main");
const defaultMsg = document.createElement("div");
const newTodoBtn = document.getElementById("new-todo");
const modalAdd = document.getElementById("overlay-add");
const overlayBg = document.getElementById("overlay-bg");
const todoForm = document.getElementById("todo-form");
const closeX = document.getElementById("close-modal");
const labelInput = document.querySelectorAll(".create-new-priority");
const submitBtn = document.getElementById("todo-submit");
const overlayDetails = document.getElementById("overlay-details");
const closeDet = document.getElementById("close-details");

const overlayEdit = document.getElementById("overlay-edit");
const closeEdit = document.getElementById("close-edit");
//1
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
//11111111111111111111111
const addTodoItem = (todoData) => {
    
    displayTodo(todoData[todoData.length - 1]);
}

/* Displays the to-do using the inputs from the form */
const displayTodo = (todoData) => {

    const itemTodo = document.createElement("div");
    const todoComplete = document.createElement("div");
    const todoTitle = document.createElement("div");
    const btnDetails = document.createElement("button");
    const todoDate = document.createElement("div");
    const todoEdit = document.createElement("div");
    const todoDel = document.createElement("div");
    const iconEdit = document.createElement("img");
    const iconDel = document.createElement("img");

    itemTodo.classList.add("item-todo");
    todoComplete.classList.add("todo-complete");
    todoTitle.classList.add("todo-title");
    btnDetails.classList.add("details-btn");
    todoDate.classList.add("todo-date")
    todoEdit.classList.add("todo-edit");
    todoEdit.classList.add("icon");
    todoDel.classList.add("todo-del");
    todoDel.classList.add("icon");

    todoTitle.textContent = todoData.title;
    btnDetails.textContent = "DETALLES";
    
    /*convert date into an string with the format "Jan 12th" */
    // const dateObject = new Date(todoData.date);
    // const dateMonth = format(dateObject, "MMM");
    // const dateDay = format(dateObject, "do");
    // const dateFormated = `${dateMonth} ${dateDay}`;
    
    // todoDate.textContent = dateFormated;

    iconEdit.src = "todo-list-main/dist/images/note-edit.svg";
    iconEdit.alt = "edit icon";

    iconDel.src = "todo-list-main/dist/images/trash-can.svg";
    iconDel.alt = "delete icon";

    if (todoData.priority == "low") {
        itemTodo.classList.add("low");
    }

    if (todoData.priority == "medium") {
        itemTodo.classList.add("medium");
    }

    if (todoData.priority == "high") {
        itemTodo.classList.add("high");
    }

    if (todoData.checked === true) {
        todoComplete.classList.add("checked");
        todoTitle.classList.add("checked");
    }

    todoDel.appendChild(iconDel);
    todoEdit.appendChild(iconEdit);

    itemTodo.appendChild(todoComplete);
    itemTodo.appendChild(todoTitle);
    itemTodo.appendChild(btnDetails);
    itemTodo.appendChild(todoDate);
    itemTodo.appendChild(todoEdit);
    itemTodo.appendChild(todoDel);

    main.appendChild(itemTodo);

    todoComplete.addEventListener("click", () => {
        
        let isChecked = toggleCheckbox(todoData.title);
        
        if (isChecked === true) {
            todoComplete.classList.add("checked");
            todoTitle.classList.add("checked");
        } else {
            todoComplete.classList.remove("checked");
            todoTitle.classList.remove("checked");
        }

    });

    

    btnDetails.addEventListener("click", (e) => {
        setActive(overlayDetails, overlayBg);
        showDetails(todoData);
    });


    todoEdit.addEventListener("click", (e) => {
        setActive(overlayEdit, overlayBg);
        showEditForm(todoData);
        
    });

    todoDel.addEventListener("click", () => {
        removeToDo(todoData.title);
        itemTodo.remove();
        let localData = JSON.parse(localStorage.getItem("todos"));

        // if (localData.length === 0) {
        //     defaultMessage();
        // }

    })

}

const showEditForm = (todoData) => {

    const editCont = document.getElementById("edit-content");
    
    editCont.innerHTML = "";

    const editForm = document.createElement("form");
    const editEntry = document.createElement("div");
    const editTitle = document.createElement("textarea");
    const editDetails = document.createElement("textarea");

    const createEditDate = document.createElement("div");
    const editDateTitle = document.createElement("div");
    const editDate = document.createElement("input");

    const prioWrapper = document.createElement("div");
    const createPrio = document.createElement("div");
    const prioTitle = document.createElement("div");
    
    const prioLow = document.createElement("input");
    const prioLowLabel = document.createElement("label");

    const prioMedium = document.createElement("input");
    const prioMediumLabel = document.createElement("label");

    const prioHigh = document.createElement("input");
    const prioHighLabel = document.createElement("label");

    const editSubmitBtn = document.createElement("input");
    
    editForm.classList.add("edit-form");
    /* Edit entry */
    
    editEntry.classList.add("edit-entry");

    editTitle.classList.add("create-edit-input");
    editTitle.placeholder = "Titulo: Pagar la renta";
    editTitle.id ="edit-todo-title";
    editTitle.name = "edit-todo";
    editTitle.maxLength = "40";
    editTitle.setAttribute("required", "");

    editDetails.classList.add("create-edit-input");
    editDetails.placeholder = "Detalles: Ej. internet, telefono, renta.";
    editDetails.id ="edit-todo-details";
    editDetails.name = "edit-todo";
    editDetails.maxLength = "40";
    
    /* Edit Date (inside of Edit Entry) */
    
    createEditDate.classList.add("create-edit-date");

    editDateTitle.classList.add("edit-date-title");
    editDateTitle.textContent = "Plazo:"

    editDate.classList.add("create-edit-date-input");
    editDate.type = "date";
    editDate.id = "edit-todo-date";
    editDate.name = "edit-todo";
    editDate.setAttribute("required", "");

    /* Edit Priority */

    prioWrapper.classList.add("edit-priority-wrapper");

    createPrio.classList.add("edit-priority");

    prioTitle.classList.add("priority-title");
    prioTitle.textContent = "Prioridad:";

    /* Priority Low */

    prioLow.type = "radio";
    prioLow.id = "create-edit low";
    prioLow.name = "create-edit-priority";
    prioLow.value = "low";
    prioLow.setAttribute("required", "");

    prioLowLabel.classList.add("create-edit-priority");
    prioLowLabel.classList.add("low");
    prioLowLabel.htmlFor = "create-edit low";
    prioLowLabel.textContent = "Baja";

    /* Priority Medium */

    prioMedium.type = "radio";
    prioMedium.id = "create-edit medium";
    prioMedium.name = "create-edit-priority";
    prioMedium.value = "medium";
    prioMedium.setAttribute("required", "");

    prioMediumLabel.classList.add("create-edit-priority");
    prioMediumLabel.classList.add("medium");
    prioMediumLabel.htmlFor = "create-edit medium";
    prioMediumLabel.textContent = "Mediana";

    /* Priority High */
    prioHigh.type = "radio";
    prioHigh.id = "create-edit high";
    prioHigh.name = "create-edit-priority";
    prioHigh.value = "high";
    prioHigh.setAttribute("required", "");

    prioHighLabel.classList.add("create-edit-priority");
    prioHighLabel.classList.add("high");
    prioHighLabel.htmlFor = "create-edit high";
    prioHighLabel.textContent = "Alta";

    /* Submit Button */

    editSubmitBtn.classList.add("create-edit-todo-submit");
    editSubmitBtn.type = "button";
    editSubmitBtn.id = "edit-submit";
    editSubmitBtn.value = "CONFIRMAR EDICIÓN";

    
    createPrio.appendChild(prioTitle);
    createPrio.appendChild(prioLow);
    createPrio.appendChild(prioLowLabel);

    createPrio.appendChild(prioMedium);
    createPrio.appendChild(prioMediumLabel);

    createPrio.appendChild(prioHigh);
    createPrio.appendChild(prioHighLabel);

    prioWrapper.appendChild(createPrio);
    prioWrapper.appendChild(editSubmitBtn);
    
    createEditDate.appendChild(editDateTitle);
    createEditDate.appendChild(editDate);
    
    editEntry.appendChild(editTitle);
    editEntry.appendChild(editDetails);
    editEntry.appendChild(createEditDate);
    editEntry.appendChild(prioWrapper);

    editForm.appendChild(editEntry);
    editCont.appendChild(editForm);

    const labelEdit = document.querySelectorAll(".create-edit-priority");
    labelEdit.forEach(btn => {
        btn.addEventListener('click', e =>{
            activePriority(e, labelEdit);
        });
    });

    editSubmitBtn.addEventListener("click", (e) => {
        addEdit(todoData.title);
        main.innerHTML = "";
        let localData = JSON.parse(localStorage.getItem("todos"));
        for (let index in localData) {
            displayTodo(localData[index]);
        }
        closeModal(overlayEdit, overlayBg); 
    });


}

const showDetails = (todoData) => {

    const detailsCont = document.getElementById("details-cont");

    detailsCont.innerHTML = ""; //clears out the contents
    
    //name element
    const name = document.createElement("div");
    name.classList.add("details-title");
    name.textContent = todoData.title;

    //priority element
    const prio = document.createElement("div");
    prio.classList.add("details-priority");

    const prioTitle = document.createElement("span");
    prioTitle.textContent = "Prioridad: ";
    prioTitle.classList.add("span-det");

    const prioCont = document.createElement("span");

    //Capitalizes the first letter of the priority value given
    const priorityValue = todoData.priority;
    const capitalize = priorityValue.charAt(0).toUpperCase()
                       + priorityValue.slice(1);
    
    prioCont.textContent = capitalize;

    //date element
    const date = document.createElement("div");
    date.classList.add("details-date");

    const dateTitle = document.createElement("span");
    dateTitle.classList.add("span-det");
    dateTitle.textContent = "Plazo: ";
    
    /* converts date into an string with the format "January 12th, 2023" */
    const dateObject = new Date(todoData.date);
    const dateMonth = dateObject.getMonth()+1;
    const dateDay = dateObject.getDate()+1;
    const dateYear = dateObject.getFullYear();
    const dateFormated = `${dateDay}/${dateMonth}/${dateYear}`;

    const dateCont = document.createElement("span");
    dateCont.textContent = dateFormated;

    //details element
    const details = document.createElement("div");
    details.classList.add("details-text");

    const detailsTitle = document.createElement("span");
    detailsTitle.textContent = "Detalles: ";
    detailsTitle.classList.add("span-det");

    const detailsContent = document.createElement("span");
    detailsContent.textContent = todoData.details;


    //renders the contents

    prio.appendChild(prioTitle);
    prio.appendChild(prioCont);

    date.appendChild(dateTitle);
    date.appendChild(dateCont);

    details.appendChild(detailsTitle);
    details.appendChild(detailsContent);

    detailsCont.appendChild(name);
    detailsCont.appendChild(prio);
    detailsCont.appendChild(date);
    detailsCont.appendChild(details);
    
}


/* opens the modal and deletes any previous unsubmitted data */
const setActive = (button, overlay) => {
    
    button.classList.add("active");
    overlay.classList.add("active");
}

/* closes the modal */
const closeModal = (modalAdd, overlay) => {
    modalAdd.classList.remove("active");
    overlay.classList.remove("active");
}
//removes active class when another priority is active
const removeActivePriority = (labels) => {
    labels.forEach(btn => {
    
        btn.classList.remove("active");

    });
}

const activePriority = (e, labels) => {
     // removes active status from all buttons
     removeActivePriority(labels);
     
     e.target.classList.add("active");
}

const defaultMessage = () => {
    defaultMsg.classList.add("default-message");

    const newTodoHead = document.createElement("div");
    newTodoHead.classList.add("message-head");
    newTodoHead.textContent = "Vacio!";

    const newTodoText = document.createElement("div");
    newTodoText.classList.add("message-text");
    newTodoText.textContent = "Por favor añade una nueva lista de tareas.";

    defaultMsg.appendChild(newTodoHead);
    defaultMsg.appendChild(newTodoText);

    main.appendChild(defaultMsg);

}


const listeners = () => {
    
    newTodoBtn.addEventListener("click", (e) => {
            todoForm.reset();
            setActive(modalAdd, overlayBg);
 
    });

    overlayBg.addEventListener("click", (e) => {
        closeModal(modalAdd, overlayBg);
        closeModal(overlayDetails, overlayBg);
        closeModal(overlayEdit, overlayBg);
        removeActivePriority(labelInput);
    });

    closeX.addEventListener("click", (e) => {
        closeModal(modalAdd, overlayBg);
        removeActivePriority(labelInput);
    });
    
    closeDet.addEventListener("click", (e) => {
        closeModal(overlayDetails, overlayBg);
    });

    closeEdit.addEventListener("click", (e) => {
        closeModal(overlayEdit, overlayBg);
    });
    
    //manages active status of the priority radio buttons
    labelInput.forEach(btn => {
        btn.addEventListener('click', e =>{
            activePriority(e, labelInput);
        });
    });

    submitBtn.addEventListener("click", (e) => {
        let todoData = addTodo();
        addTodoItem(todoData);
        closeModal(modalAdd, overlayBg);
        removeActivePriority(labelInput);
        defaultMsg.remove();
    });
    
} 
/* Handles the interaction between de user and the UI */

const loadTodo = () => {

    let localData = JSON.parse(localStorage.getItem("todos"));

    if (localData != null) { //checks if there aren't items inside the array
        defaultMsg.remove();
        for (let index in localData) {
            displayTodo(localData[index]);
        }
    }
    if (localStorage.length === 0){
        defaultMessage();
    } else if (localData.length === 0) {
        defaultMessage();
    }


    listeners();
    
}

loadTodo();