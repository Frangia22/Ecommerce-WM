//const api = require('../api');
// Mostrar el estado de cada checkbox
const filtroUno = document.querySelector('#filtro-1');
filtroUno.addEventListener("click", () => {
    if (filtroUno.checked){
        const data = api.getWines();
    }else{
        alert('Deseleccionaste el filtroUno');
    }
});

const filtroDos = document.querySelector('#filtro-2');
filtroDos.addEventListener("click", () => {
    if (filtroDos.checked){
        alert('Seleccionaste el filtroDos');
    }else{
        alert('Deseleccionaste el filtroDos');
    }
});
const filtroTres = document.querySelector('#filtro-3');
filtroTres.addEventListener("click", () => {
    if (filtroTres.checked){
        alert('Seleccionaste el filtroTres');
    }else{
        alert('Deseleccionaste el filtroTres');
    }
});
const filtroCuatro = document.querySelector('#filtro-4');
filtroCuatro.addEventListener("click", () => {
    if (filtroCuatro.checked){
        alert('Seleccionaste el filtroCuatro');
    }else{
        alert('Deseleccionaste el filtroCuatro');
    }
});
