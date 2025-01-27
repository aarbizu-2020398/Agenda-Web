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

                if (contacts.some(contact => contact.email.toLowerCase() === email.toLowerCase())) {
                    alert("Este contacto ya está registrado.");
                    return;
                }

                contacts.push({ name, phone, email, favorite: false });
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
                    <div>
                        <button class='btn ${contact.favorite ? 'btn-success' : 'btn-outline-success'} btn-sm' 
                                onclick='toggleFavorite(${index})'>
                            ${contact.favorite ? '★ Favorito' : '☆ Marcar Favorito'}
                        </button>
                        <button class='btn btn-danger btn-sm' onclick='deleteContact("${contact.email}")'>Eliminar</button>
                    </div>
                `;
                contactsList.appendChild(contactItem);
            });
        }
    }

    window.deleteContact = function(email) {
        let contacts = JSON.parse(localStorage.getItem("contacts")) || [];
        const updatedContacts = contacts.filter(contact => contact.email.toLowerCase() !== email.toLowerCase());

        if (contacts.length !== updatedContacts.length) {
            localStorage.setItem("contacts", JSON.stringify(updatedContacts));
            alert("Contacto eliminado correctamente.");
            displayContacts();
        } else {
            alert("No se encontró el contacto.");
        }
    };

    window.toggleFavorite = function(index) {
        let contacts = JSON.parse(localStorage.getItem("contacts")) || [];

        contacts[index].favorite = !contacts[index].favorite;
        localStorage.setItem("contacts", JSON.stringify(contacts));

        updateFavorites();
        alert(contacts[index].favorite ? "Contacto agregado a favoritos" : "Contacto eliminado de favoritos");
        displayContacts();
    };

    function updateFavorites() {
        let contacts = JSON.parse(localStorage.getItem("contacts")) || [];
        let favorites = contacts.filter(contact => contact.favorite);
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }

    function displayFavorites() {
        const favoritesList = document.getElementById("favorites-list");

        if (!favoritesList) return;

        let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
        favoritesList.innerHTML = "";

        if (favorites.length === 0) {
            favoritesList.innerHTML = "<p class='text-center'>No tienes contactos favoritos aún.</p>";
        } else {
            favorites.forEach(contact => {
                let contactCard = document.createElement("div");
                contactCard.classList.add("col-md-4", "mb-4");

                contactCard.innerHTML = `
                    <div class="card shadow-sm">
                        <img class="card-img-top" src="https://via.placeholder.com/150" alt="Imagen de contacto">
                        <div class="card-body">
                            <h5 class="card-title">${contact.name}</h5>
                            <p class="card-text">Teléfono: ${contact.phone}</p>
                            <p class="card-text">Correo: ${contact.email}</p>
                            <button class="btn btn-danger btn-sm" onclick="removeFavorite('${contact.email}')">Eliminar de Favoritos</button>
                        </div>
                    </div>
                `;
                favoritesList.appendChild(contactCard);
            });
        }
    }

    window.removeFavorite = function(email) {
        let contacts = JSON.parse(localStorage.getItem("contacts")) || [];
        const contactIndex = contacts.findIndex(contact => contact.email.toLowerCase() === email.toLowerCase());

        if (contactIndex !== -1) {
            contacts[contactIndex].favorite = false;
            localStorage.setItem("contacts", JSON.stringify(contacts));
            alert("Contacto eliminado de favoritos.");
            updateFavorites();
            displayFavorites();
        }
    };

    if (document.getElementById("contacts-list")) {
        displayContacts();
    }

    if (document.getElementById("favorites-list")) {
        displayFavorites();
    }

    window.logout = function () {
        alert("Sesión cerrada");
        localStorage.clear();
        window.location.href = "/login/login.html";
    };
});
