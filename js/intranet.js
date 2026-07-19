document.addEventListener("DOMContentLoaded", () => {
    if (sessionStorage.getItem("sesion-activa") !== "true") {
        window.location.href = "login.html";
        return;
    }

    const nombre = sessionStorage.getItem("usuario-activo") || "Usuario";
    const saludo = document.getElementById("saludo-usuario");

    if (saludo) {
        saludo.textContent = `Bienvenido, ${nombre}`;
    }
});

function abrirCierreSesion() {
    document.getElementById("dialogo-cierre-sesion").showModal();
}

function cancelarCierreSesion() {
    document.getElementById("dialogo-cierre-sesion").close();
}

function confirmarCierreSesion() {
    sessionStorage.removeItem("sesion-activa");
    sessionStorage.removeItem("usuario-activo");
    window.location.href = "index.html";
}
