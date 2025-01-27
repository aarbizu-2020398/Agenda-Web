document.addEventListener("DOMContentLoaded", function () {

    const contactForm = document.getElementById("contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const name = document.getElementById("name").value.trim();
            const phone = document.getElementById("phone").value.trim();
            const email = document.getElementById("email").value.trim();

            if (name && phone && email) {
                let contacts = JSON.parse(localStorage.getItem("contacts")) || [];

                contacts.push({ name, phone, email });
                localStorage.setItem("contacts", JSON.stringify(contacts));

                alert("Contacto agregado exitosamente.");

                window.location.href = "/detalle-contactos/detalle-contactos.html";
            } else {
                alert("Por favor, complete todos los campos.");
            }
        });
    }

    function displayContacts() {
        let contacts = JSON.parse(localStorage.getItem("contacts")) || [];
        const contactsList = document.getElementById("contacts-list");
        if (!contactsList) return; 
    
        contactsList.innerHTML = "";
        
        if (contacts.length === 0) {
            contactsList.innerHTML = "<li class='list-group-item text-center'>No hay contactos agregados.</li>";
        } else {
            contacts.forEach((contact, index) => {
                let contactItem = document.createElement("li");
                contactItem.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");
                contactItem.innerHTML = `
                    <div>
                        <strong>${contact.name}</strong><br>
                        <span>${contact.phone}</span><br>
                        <span>${contact.email}</span>
                    </div>
                    <button class='btn btn-danger btn-sm' onclick='deleteContact(${index})'>Eliminar</button>
                `;
                contactsList.appendChild(contactItem);
            });
        }
    }

    window.deleteContact = function(index) {
        let contacts = JSON.parse(localStorage.getItem("contacts")) || [];
        console.log("Antes de eliminar:", contacts);

        if (index >= 0 && index < contacts.length) {
            contacts.splice(index, 1);
            localStorage.setItem("contacts", JSON.stringify(contacts));
            console.log("Después de eliminar:", contacts);
            alert("Contacto eliminado correctamente.");
            displayContacts();  
        } else {
            alert("No se encontró el contacto.");
        }
    };

    const contactsList = document.getElementById("contacts-list");
    if (contactsList) {
        displayContacts();
    }

    window.logout = function () {
        alert("Sesión cerrada");
        window.location.href = "/login/login.html";
    };
});
