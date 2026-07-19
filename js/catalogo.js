function filtrarCatalogo(categoria, boton) {
    const tarjetas = document.querySelectorAll(".tarjeta-plato");
    const botones = document.querySelectorAll(".boton-filtro");

    botones.forEach((elemento) => elemento.classList.remove("filtro-activo"));
    boton.classList.add("filtro-activo");

    tarjetas.forEach((tarjeta) => {
        const coincide = categoria === "todos" || tarjeta.dataset.categoria === categoria;
        tarjeta.classList.toggle("tarjeta-oculta", !coincide);
    });
}
