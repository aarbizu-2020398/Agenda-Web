document.addEventListener("DOMContentLoaded", () => {
    const taskForm = document.getElementById("add-task-form");
    const taskNameInput = document.getElementById("task-name");
    const prioritySelect = document.getElementById("priority");
    const reminderDateInput = document.getElementById("reminder-date");
    const todoContainer = document.getElementById("todo-container");

    // Manejar el envío del formulario
    taskForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const taskName = taskNameInput.value.trim();
        const priority = prioritySelect.value;
        const reminderDate = reminderDateInput.value;

        if (taskName && reminderDate) {
            const taskItem = document.createElement("div");
            taskItem.classList.add("list-group-item");
            taskItem.dataset.reminderDate = reminderDate;

            // Crear contenido de la tarea
            taskItem.innerHTML = `
                <div class="task-info">
                    <strong>${taskName}</strong>
                    <small>Prioridad: ${priority}</small>
                    <small>Fecha límite: ${new Date(reminderDate).toLocaleString()}</small>
                </div>
                <div>
                    <button class="btn-complete">Completar</button>
                    <button class="btn-favorite">Favorito</button>
                </div>
            `;

            todoContainer.appendChild(taskItem);

            // Limpiar formulario
            taskNameInput.value = "";
            prioritySelect.value = "Alta";
            reminderDateInput.value = "";
        } else {
            alert("Por favor, completa todos los campos antes de agregar la tarea.");
        }
    });

    // Delegar eventos de botones
    todoContainer.addEventListener("click", (e) => {
        const taskItem = e.target.closest(".list-group-item");

        if (!taskItem) return;

        if (e.target.classList.contains("btn-complete")) {
            // Marcar como completado
            taskItem.classList.toggle("completed");
            taskItem.classList.remove("expired", "not-completed"); // Quitar otros estados
        }

        if (e.target.classList.contains("btn-favorite")) {
            // Marcar como favorito
            taskItem.classList.toggle("favorite");
        }
    });

    // Verificar tareas vencidas y no completadas
    setInterval(() => {
        const currentTime = new Date();

        document.querySelectorAll(".list-group-item").forEach((taskItem) => {
            if (!taskItem.classList.contains("completed")) {
                const reminderDate = new Date(taskItem.dataset.reminderDate);

                if (reminderDate && reminderDate < currentTime) {
                    // Marcar como vencida
                    taskItem.classList.add("expired");

                    // Marcar también como no completada
                    taskItem.classList.add("not-completed");
                }
            }
        });
    }, 1000 * 60); // Verificar cada minuto
});
