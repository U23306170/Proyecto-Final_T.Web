function validarCampoLogin(campo) {
    const error = document.getElementById(`error-${campo.id}`);
    let esValido = campo.checkValidity() && campo.value.trim() !== "";

    if (campo.id === "correo") {
        esValido = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(campo.value.trim());
    }

    if (campo.id === "clave") {
        esValido = campo.value.length >= 6;
    }

    campo.classList.toggle("campo-error", !esValido);
    campo.setAttribute("aria-invalid", String(!esValido));

    if (error) {
        error.textContent = esValido ? "" : campo.id === "correo"
            ? "Ingrese un correo válido."
            : "La contraseña debe tener al menos 6 caracteres.";
    }

    return esValido;
}

function alternarClaveLogin(checkbox) {
    const clave = document.getElementById("clave");
    clave.type = checkbox.checked ? "text" : "password";
}

function iniciarSesion(evento) {
    evento.preventDefault();
    const correo = document.getElementById("correo");
    const clave = document.getElementById("clave");
    const mensaje = document.getElementById("mensaje-login");

    if (!validarCampoLogin(correo) || !validarCampoLogin(clave)) {
        mensaje.textContent = "Complete correctamente los datos de acceso.";
        mensaje.className = "mensaje-formulario mensaje-error";
        return;
    }

    const usuarioRegistrado = JSON.parse(localStorage.getItem("usuario-restaurante") || "null");
    const accesoAdministrador = correo.value.trim() === "admin@mail.com" && clave.value === "123456";
    const accesoRegistrado = usuarioRegistrado
        && correo.value.trim() === usuarioRegistrado.correo
        && clave.value === usuarioRegistrado.clave;

    if (!accesoAdministrador && !accesoRegistrado) {
        mensaje.textContent = "Correo o contraseña incorrectos.";
        mensaje.className = "mensaje-formulario mensaje-error";
        return;
    }

    sessionStorage.setItem("sesion-activa", "true");
    sessionStorage.setItem("usuario-activo", accesoAdministrador ? "Administrador" : usuarioRegistrado.nombre);
    mensaje.textContent = "Acceso correcto. Redirigiendo a la intranet...";
    mensaje.className = "mensaje-formulario mensaje-exito";

    setTimeout(() => {
        window.location.href = "intranet.html";
    }, 450);
}
