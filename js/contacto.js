const patronesContacto = {
    nombres: /^[A-Za-zÁÉÍÓÚáéíóúÑñ ]{2,40}$/,
    apellidos: /^[A-Za-zÁÉÍÓÚáéíóúÑñ ]{2,50}$/,
    dni: /^\d{8}$/,
    correo: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
    celular: /^9\d{8}$/,
    consulta: /^.{10,500}$/s
};

const mensajesContacto = {
    nombres: "Ingrese nombres válidos.",
    apellidos: "Ingrese apellidos válidos.",
    dni: "El DNI debe contener 8 dígitos.",
    correo: "Ingrese un correo electrónico válido.",
    celular: "El celular debe iniciar con 9 y tener 9 dígitos.",
    consulta: "La consulta debe tener entre 10 y 500 caracteres."
};

function validarCampoContacto(campo) {
    const esValido = patronesContacto[campo.id]?.test(campo.value.trim()) ?? campo.checkValidity();
    const error = document.getElementById(`error-${campo.id}`);

    campo.classList.toggle("campo-error", !esValido);
    campo.setAttribute("aria-invalid", String(!esValido));

    if (error) {
        error.textContent = esValido ? "" : mensajesContacto[campo.id] || "Revise este campo.";
    }

    return esValido;
}

function enviarContacto(evento) {
    evento.preventDefault();
    const formulario = document.getElementById("formulario-contacto");
    const campos = [...formulario.querySelectorAll("input, textarea")];
    const esValido = campos.every((campo) => validarCampoContacto(campo));
    const mensaje = document.getElementById("mensaje-contacto");

    if (!esValido) {
        mensaje.textContent = "Revise los campos marcados antes de enviar.";
        mensaje.className = "mensaje-formulario mensaje-error";
        return;
    }

    const resumen = document.getElementById("resumen-contacto");
    resumen.innerHTML = `
        <p><strong>Cliente:</strong> ${document.getElementById("nombres").value.trim()} ${document.getElementById("apellidos").value.trim()}</p>
        <p><strong>Correo:</strong> ${document.getElementById("correo").value.trim()}</p>
        <p><strong>Celular:</strong> ${document.getElementById("celular").value.trim()}</p>
        <p><strong>Consulta:</strong> ${document.getElementById("consulta").value.trim()}</p>
    `;

    mensaje.textContent = "El formulario fue validado correctamente.";
    mensaje.className = "mensaje-formulario mensaje-exito";
    document.getElementById("dialogo-contacto").showModal();
}

function cerrarDialogoContacto() {
    const dialogo = document.getElementById("dialogo-contacto");
    const formulario = document.getElementById("formulario-contacto");
    dialogo.close();
    formulario.reset();
    formulario.querySelectorAll(".error-campo").forEach((elemento) => elemento.textContent = "");
    document.getElementById("mensaje-contacto").textContent = "";
}
