document.addEventListener("DOMContentLoaded", () => {
    const botonMenu = document.querySelector(".boton-menu");
    const menu = document.querySelector(".menu-principal, .menu-intranet");

    if (!botonMenu || !menu) {
        return;
    }

    botonMenu.addEventListener("click", () => {
        const estaAbierto = menu.classList.toggle("menu-activo");
        botonMenu.setAttribute("aria-expanded", String(estaAbierto));
        botonMenu.setAttribute("aria-label", estaAbierto ? "Cerrar menú" : "Abrir menú");
    });

    menu.querySelectorAll("a").forEach((enlace) => {
        enlace.addEventListener("click", () => {
            menu.classList.remove("menu-activo");
            botonMenu.setAttribute("aria-expanded", "false");
            botonMenu.setAttribute("aria-label", "Abrir menú");
        });
    });
});
