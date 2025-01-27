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

                // Evitar duplicados por email
                if (contacts.some(contact => contact.email.toLowerCase() === email.toLowerCase())) {
                    alert("El contacto ya existe con este correo electrónico.");
                    return;
                }

                contacts.push({ name, phone, email });
                localStorage.setItem("contacts", JSON.stringify(contacts));

                alert("Contacto agregado exitosamente.");
                window.location.href = "./detalle-contactos.html";
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
                        <button class='btn btn-warning btn-sm me-2' onclick='addFavorite(${index})'>Favorito</button>
                        <button class='btn btn-danger btn-sm' onclick='deleteContact(${index})'>Eliminar</button>
                    </div>
                `;
                contactsList.appendChild(contactItem);
            });
        }
    }

    window.deleteContact = function (index) {
        let contacts = JSON.parse(localStorage.getItem("contacts")) || [];
        if (index >= 0 && index < contacts.length) {
            contacts.splice(index, 1);
            localStorage.setItem("contacts", JSON.stringify(contacts));
            alert("Contacto eliminado correctamente.");
            displayContacts();
        }
    };

    window.addFavorite = function (index) {
        let contacts = JSON.parse(localStorage.getItem("contacts")) || [];
        let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

        const contactToAdd = contacts[index];

        if (!favorites.some(fav => fav.email === contactToAdd.email)) {
            favorites.push(contactToAdd);
            localStorage.setItem("favorites", JSON.stringify(favorites));
            alert("Contacto agregado a favoritos.");
        } else {
            alert("Este contacto ya está en favoritos.");
        }
    };

    function displayFavorites() {
        const favoritesList = document.getElementById("favorites-list");

        if (!favoritesList) return;

        let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

        favoritesList.innerHTML = "";

        if (favorites.length === 0) {
            favoritesList.innerHTML = "<p class='text-center'>No tienes contactos favoritos aún.</p>";
        } else {
            favorites.forEach((contact, index) => {
                const contactCard = document.createElement("div");
                contactCard.classList.add("col-md-4", "mb-4");

                contactCard.innerHTML = `
                    <div class="card shadow-sm">
                        <img class="card-img-top" src="https://via.placeholder.com/150" alt="Imagen de contacto">
                        <div class="card-body">
                            <h5 class="card-title">${contact.name}</h5>
                            <p class="card-text">Teléfono: ${contact.phone}</p>
                            <p class="card-text">Correo: ${contact.email}</p>
                            <button class="btn btn-danger btn-sm" onclick="removeFavorite(${index})">Eliminar de Favoritos</button>
                        </div>
                    </div>
                `;
                favoritesList.appendChild(contactCard);
            });
        }
    }

    window.removeFavorite = function (index) {
        let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
        if (index >= 0 && index < favorites.length) {
            favorites.splice(index, 1);
            localStorage.setItem("favorites", JSON.stringify(favorites));
            alert("Contacto eliminado de favoritos.");
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
