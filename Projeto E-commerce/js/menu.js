document.addEventListener("DOMContentLoaded", function () {
    const botaoMenu = document.querySelector(".menu-hamburguer");
    const cabecalho = document.querySelector(".cabecalho");

    botaoMenu.addEventListener("click", function () {
        cabecalho.classList.toggle("menu-ativo");
    });
});
