const msg = new URLSearchParams(window.location.search).get('msg');
if (msg) {
    document.getElementById("error-msg").textContent = msg;
}

const boton = document.getElementById("ir_login");

boton.addEventListener("click", () => {
    window.location.href = "/";
});
