document.addEventListener("DOMContentLoaded", () => {
    const taskForm = document.getElementById("add-task-form");
    const taskNameInput = document.getElementById("task-name");
    const prioritySelect = document.getElementById("priority");
    const reminderDateInput = document.getElementById("reminder-date");
    const todoContainer = document.getElementById("todo-container");


    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        todoContainer.innerHTML = "";  

        tasks.forEach((task, index) => {
            renderTask(task, index);
        });
    }


    function renderTask(task, index) {
        const taskItem = document.createElement("div");
        taskItem.classList.add("list-group-item");
        taskItem.dataset.reminderDate = task.reminderDate;
        if (task.completed) taskItem.classList.add("completed");
        if (task.favorite) taskItem.classList.add("favorite");

        taskItem.innerHTML = `
            <div class="task-info">
                <strong>${task.name}</strong>
                <small>Prioridad: ${task.priority}</small>
                <small>Fecha límite: ${new Date(task.reminderDate).toLocaleString()}</small>
            </div>
            <div>
                <button class="btn-complete" data-index="${index}">Completar</button>
                <button class="btn-favorite" data-index="${index}">Favorito</button>
                <button class="btn-delete" data-index="${index}">Eliminar</button>
            </div>
        `;

        todoContainer.appendChild(taskItem);
    }


    taskForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const taskName = taskNameInput.value.trim();
        const priority = prioritySelect.value;
        const reminderDate = reminderDateInput.value;

        if (taskName && reminderDate) {
            let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

            const newTask = {
                name: taskName,
                priority: priority,
                reminderDate: reminderDate,
                completed: false,
                favorite: false
            };

            tasks.push(newTask);
            localStorage.setItem("tasks", JSON.stringify(tasks));

            renderTask(newTask, tasks.length - 1);

            taskNameInput.value = "";
            prioritySelect.value = "Alta";
            reminderDateInput.value = "";
        } else {
            alert("Por favor, completa todos los campos antes de agregar la tarea.");
        }
    });


    todoContainer.addEventListener("click", (e) => {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        const index = e.target.dataset.index;

        if (!index) return;

        if (e.target.classList.contains("btn-complete")) {
            tasks[index].completed = !tasks[index].completed;
        } else if (e.target.classList.contains("btn-favorite")) {
            tasks[index].favorite = !tasks[index].favorite;
        } else if (e.target.classList.contains("btn-delete")) {
            tasks.splice(index, 1);
        }

        localStorage.setItem("tasks", JSON.stringify(tasks));
        loadTasks();
    });


    setInterval(() => {
        const currentTime = new Date();
        document.querySelectorAll(".list-group-item").forEach((taskItem) => {
            if (!taskItem.classList.contains("completed")) {
                const reminderDate = new Date(taskItem.dataset.reminderDate);
                if (reminderDate && reminderDate < currentTime) {
                    taskItem.classList.add("expired", "not-completed");
                }
            }
        });
    }, 1000 * 60);


    loadTasks();
});
