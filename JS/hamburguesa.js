const nav = document.getElementById("nav");
const botonHamburguesa = document.getElementById("nav-hamburguesa");

if (botonHamburguesa) {
    botonHamburguesa.addEventListener("click", () => {
        nav.classList.toggle("nav--abierto");
        botonHamburguesa.classList.toggle("nav__hamburguesa--activo");
    });
}