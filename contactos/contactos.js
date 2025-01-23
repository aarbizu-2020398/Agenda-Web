document.addEventListener("DOMContentLoaded", function () {
    // Manejar el envío del formulario para agregar contactos
    const contactForm = document.getElementById("contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();

            // Obtener valores del formulario
            const name = document.getElementById("name").value.trim();
            const phone = document.getElementById("phone").value.trim();
            const email = document.getElementById("email").value.trim();

            if (name && phone && email) {
                // Obtener contactos almacenados o inicializar un array vacío
                let contacts = JSON.parse(localStorage.getItem("contacts")) || [];

                // Agregar el nuevo contacto
                contacts.push({ name, phone, email });
                localStorage.setItem("contacts", JSON.stringify(contacts));

                alert("Contacto agregado exitosamente.");

                // Redirigir a la página de detalle de contactos
                window.location.href = "/detalle-contactos/detalle-contactos.html";
            } else {
                alert("Por favor, complete todos los campos.");
            }
        });
    }

    // Mostrar contactos en la página de detalle-contactos
    const contactsList = document.getElementById("contacts-list");
    if (contactsList) {
        let contacts = JSON.parse(localStorage.getItem("contacts")) || [];
        contactsList.innerHTML = "";

        if (contacts.length === 0) {
            contactsList.innerHTML = "<li class='list-group-item text-center'>No hay contactos agregados.</li>";
        } else {
            contacts.forEach(contact => {
                let contactItem = document.createElement("li");
                contactItem.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");
                contactItem.innerHTML = `
                    <div>
                        <strong>${contact.name}</strong><br>
                        <span>${contact.phone}</span><br>
                        <span>${contact.email}</span>
                    </div>
                    <button class='btn btn-danger btn-sm' onclick='deleteContact("${contact.email}")'>Eliminar</button>
                `;
                contactsList.appendChild(contactItem);
            });
        }
    }

    // Función para eliminar un contacto por email
    window.deleteContact = function(email) {
        let contacts = JSON.parse(localStorage.getItem("contacts")) || [];
        contacts = contacts.filter(contact => contact.email !== email);
        localStorage.setItem("contacts", JSON.stringify(contacts));
        displayContacts();
    };

    // Función para actualizar la lista de contactos en la página de detalle
    function displayContacts() {
        let contacts = JSON.parse(localStorage.getItem("contacts")) || [];
        contactsList.innerHTML = "";
        
        if (contacts.length === 0) {
            contactsList.innerHTML = "<li class='list-group-item text-center'>No hay contactos agregados.</li>";
        } else {
            contacts.forEach(contact => {
                let contactItem = document.createElement("li");
                contactItem.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");
                contactItem.innerHTML = `
                    <div>
                        <strong>${contact.name}</strong><br>
                        <span>${contact.phone}</span><br>
                        <span>${contact.email}</span>
                    </div>
                    <button class='btn btn-danger btn-sm' onclick='deleteContact("${contact.email}")'>Eliminar</button>
                `;
                contactsList.appendChild(contactItem);
            });
        }
    }

    // Llamar a la función para cargar contactos al cargar la página
    displayContacts();

    // Función de cierre de sesión simulada
    window.logout = function () {
        alert("Sesión cerrada");
        window.location.href = "/login/login.html";
    };
});
