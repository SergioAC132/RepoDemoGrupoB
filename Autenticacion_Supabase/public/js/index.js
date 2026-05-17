const btnLogIn = document.getElementById("iniciar-sesion");
const btnSingUp = document.getElementById("registrarse");
const partLogIn = document.getElementById("login");
const partSingUp = document.getElementById("singup");
const LogInCorreo = document.getElementById("login-correo");
const LogInContrasena = document.getElementById("login-contrasena");
const SingUpCorreo = document.getElementById("singup-correo");
const SingUpContrasena = document.getElementById("singup-contrasena");

const errorLoginEl = document.getElementById('login-error');
const errorSingUpEl = document.getElementById('signup-error');
errorLoginEl.style.display = 'none';
errorSingUpEl.style.display = 'none';

btnLogIn.addEventListener("click", () => {
    btnSingUp.classList.remove("active");
    btnLogIn.classList.add("active");
    partLogIn.classList.remove("hidden");
    partSingUp.classList.add("hidden");
});

btnSingUp.addEventListener("click", () => {
    btnLogIn.classList.remove("active");
    btnSingUp.classList.add("active");
    partSingUp.classList.remove("hidden");
    partLogIn.classList.add("hidden");
});

document.getElementById('login-form').addEventListener('submit', async e => {
    e.preventDefault();
    const correo = LogInCorreo.value;
    const contrasena = LogInContrasena.value;

    const res = await fetch("/login", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `email=${encodeURIComponent(correo)}&password=${encodeURIComponent(contrasena)}`,
        credentials: 'same-origin',
        redirect: 'follow'
    });

    window.location.href = res.url;
});

document.getElementById('singup-form').addEventListener('submit', async e => {
    e.preventDefault();
    const correo = SingUpCorreo.value;
    const contrasena = SingUpContrasena.value;

    const response = await fetch("/signup", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `email=${encodeURIComponent(correo)}&password=${encodeURIComponent(contrasena)}`,
        credentials: 'same-origin',
        redirect: 'follow'
    });

    window.location.href = response.url;

});
