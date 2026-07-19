function irAlCatalogo() {
    window.location.href = "nuestro-catalogo.html";
}

function alternarDestacados() {
    const contenedor = document.getElementById("platos-destacados");
    const boton = document.getElementById("boton-destacados");

    if (!contenedor || !boton) {
        return;
    }

    const estaOculto = contenedor.classList.toggle("oculto");
    boton.textContent = estaOculto ? "Mostrar platos destacados" : "Ocultar platos destacados";
    boton.setAttribute("aria-expanded", String(!estaOculto));
}
