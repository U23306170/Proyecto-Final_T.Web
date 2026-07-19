function validarCampoRegistro(campo) {
    const error = document.getElementById(`error-${campo.id}`);
    let esValido = campo.checkValidity();
    let textoError = "Revise este campo.";

    if (campo.id === "nombre-registro") {
        esValido = /^[A-Za-zÁÉÍÓÚáéíóúÑñ ]{3,60}$/.test(campo.value.trim());
        textoError = "Ingrese un nombre completo válido.";
    }

    if (campo.id === "correo-registro") {
        esValido = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(campo.value.trim());
        textoError = "Ingrese un correo válido.";
    }

    if (campo.id === "celular-registro") {
        esValido = /^9\d{8}$/.test(campo.value.trim());
        textoError = "Ingrese un celular peruano de 9 dígitos.";
    }

    if (campo.id === "clave-registro") {
        esValido = /^(?=.*[A-Za-z])(?=.*\d).{6,20}$/.test(campo.value);
        textoError = "Use de 6 a 20 caracteres e incluya letras y números.";
    }

    if (campo.id === "confirmar-clave") {
        esValido = campo.value === document.getElementById("clave-registro").value && campo.value !== "";
        textoError = "Las contraseñas no coinciden.";
    }

    campo.classList.toggle("campo-error", !esValido);
    campo.setAttribute("aria-invalid", String(!esValido));

    if (error) {
        error.textContent = esValido ? "" : textoError;
    }

    return esValido;
}

function validarTerminos(checkbox) {
    const error = document.getElementById("error-terminos");
    error.textContent = checkbox.checked ? "" : "Debe aceptar los términos para continuar.";
    return checkbox.checked;
}

function registrarUsuario(evento) {
    evento.preventDefault();
    const formulario = document.getElementById("formulario-registro");
    const campos = [...formulario.querySelectorAll("input:not([type='checkbox'])")];
    const terminos = document.getElementById("terminos");
    const mensaje = document.getElementById("mensaje-registro");
    const camposValidos = campos.every((campo) => validarCampoRegistro(campo));
    const terminosValidos = validarTerminos(terminos);

    if (!camposValidos || !terminosValidos) {
        mensaje.textContent = "Revise los datos indicados antes de registrar la cuenta.";
        mensaje.className = "mensaje-formulario mensaje-error";
        return;
    }

    const usuario = {
        nombre: document.getElementById("nombre-registro").value.trim(),
        correo: document.getElementById("correo-registro").value.trim(),
        celular: document.getElementById("celular-registro").value.trim(),
        clave: document.getElementById("clave-registro").value
    };

    localStorage.setItem("usuario-restaurante", JSON.stringify(usuario));
    mensaje.textContent = "Registro completado correctamente.";
    mensaje.className = "mensaje-formulario mensaje-exito";
    document.getElementById("dialogo-registro").showModal();
}

function irAlLogin() {
    window.location.href = "login.html";
}
