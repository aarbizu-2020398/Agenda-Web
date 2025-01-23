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
                // Obtener los contactos almacenados o inicializar un array vacío
                let contacts = JSON.parse(localStorage.getItem("contacts")) || [];

                // Agregar nuevo contacto al almacenamiento
                contacts.push({ name, phone, email });
                localStorage.setItem("contacts", JSON.stringify(contacts));

                alert("Contacto agregado exitosamente.");

                // Redirigir a la página de detalle de contactos
                window.location.href = "/detalle-contactos/detalle-contactos.html";
            } else {
                alert("Por favor, completa todos los campos.");
            }
        });
    }

    // Función para eliminar un contacto por email
    window.deleteContact = function(email) {
        let contacts = JSON.parse(localStorage.getItem("contacts")) || [];
        contacts = contacts.filter(contact => contact.email !== email);
        localStorage.setItem("contacts", JSON.stringify(contacts));
        location.reload();
    };

    // Función de cierre de sesión
    window.logout = function () {
        alert("Sesión cerrada");
        window.location.href = "/login/login.html";
    };
});
