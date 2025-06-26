let tasks = [
    { id: 1, description: "lavar a louça", checked: false },
    { id: 2, description: "comprar pão", checked: false },
    { id: 3, description: "arrumar o quarto", checked: true },
    { id: 4, description: "fazer exercícios", checked: true },
]

const removeTask = (taskId) => {
    tasks = tasks.filter(({id}) => parseInt(id) !== parseInt(taskId));

    document
    .getElementById("todo-list")
    .removeChild(document.getElementById(taskId));
}

const createTaskListItem = (task, checkbox) => {
    const list = document.getElementById("todo-list");
    const todo = document.createElement("li");

    const removeTaskButton = document.createElement("button");
    removeTaskButton.textContent = "x";
    removeTaskButton.ariaLabel = "remover tarefa";

    removeTaskButton.onclick = () => removeTask(task.id);
    
    todo.id = task.id;
    todo.appendChild(checkbox);
    todo.appendChild(removeTaskButton);
    list.appendChild(todo);
    
    return todo;
}

const getCheckBoxInput = ({ id, description, checked }) => {
    const checkbox = document.createElement("input");
    const label = document.createElement("label");
    const wrapper = document.createElement("div")
    const checkBoxId = `${id}-checkbox`;

    checkbox.type = "checkbox";
    checkbox.id = checkBoxId;
    checkbox.checked = checked || false;
    
    label.textContent = description;
    label.htmlFor = checkBoxId;

    wrapper.className = "checkbox-label-container";

    wrapper.appendChild(checkbox);
    wrapper.appendChild(label);

    return wrapper;
}

const getNewTaskId = () => {
    const lastId = tasks[tasks.length - 1]?.id;
    return lastId ? lastId + 1 : 1;
}

const getNewTaskData = (event) => {
    const description = event.target.elements.description.value;
    const id = getNewTaskId();
 
    return { description, id };
}

const createTask = (event) => {
    event.preventDefault();
    const newTaskData = getNewTaskData(event);
    //const (id, description) = newTaskData; 

    const checkbox = getCheckBoxInput(newTaskData)
    createTaskListItem(newTaskData, checkbox);

    tasks = [...tasks, { id: newTaskData.id, description: newTaskData.description, checked: false }]
}

window.onload = function() {
    const form = document.getElementById("create-todo-form")
    form.addEventListener("submit", createTask)
    

    tasks.forEach((task) => {
        const checkbox = getCheckBoxInput(task);
        const list = document.getElementById("todo-list");
        const todo = document.createElement("li")

        const removeTaskButton = document.createElement("button");
        removeTaskButton.textContent = "x";
        removeTaskButton.ariaLabel = "remover tarefa";

        removeTaskButton.onclick = () => removeTask(task.id);

        todo.id = task.id;
        todo.appendChild(checkbox);
        todo.appendChild(removeTaskButton);
        list.appendChild(todo);
    })
}