document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("login-form");
    const errorMessage = document.getElementById("error-message");

    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();

        if (email !== "" && password !== "") {
           
            localStorage.setItem("loggedInUser", JSON.stringify({ email }));
            alert("Inicio de sesión exitoso");
            window.location.href = "/contactos/contactos.html"; 
        } else {
            errorMessage.classList.remove("d-none");
        }
    });
});
