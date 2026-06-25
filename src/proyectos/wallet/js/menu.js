/* global $ */
/* REQUERIMIENTOS 
Agregar eventos a estos tres botones: "Depositar", "Enviar Dinero" y "Últimos Movimientos" para que al hacer clic aparezca una leyenda que diga, redirigiendo a “nombre de la pantalla seleccionada”. EJemplo: redirigiendo a últimos movimientos.

Implementa la funcionalidad de los botones utilizando JavaScript para redirigir a las pantallas correspondientes.
*/

// Bloque de importaciones
import { redirigir } from "./utils.js";

// Bloque principal
const enviarLeyenda = (nombreVista) => {
    // MIGRADO: Selector jQuery
    const leyendaContainer = $("#contenedor-alerta");

    if (leyendaContainer.length) {
        // MIGRADO: Reemplazo de .innerHTML por .html()
        leyendaContainer.html(
            `<div class=\"text-center mt-4\">
                <p id=\"navegacionResponse\" class=\"text-primary fw-bold fs-5\">
                    Redirigiendo a "${nombreVista.toLowerCase()}"...
                </p>
            </div>`
        );
    }
}

const navegarAVista = (e) => {
    e.preventDefault();

    // MIGRADO: En jQuery, para capturar atributos del elemento que disparó el evento usamos $(e.currentTarget)
    const urlDestino = $(e.currentTarget).attr("href");
    const nombreVista = $(e.currentTarget).text();    

    enviarLeyenda(nombreVista);

    setTimeout(redirigir, 1000, urlDestino);
}

const iniciarSaldo = () => {
    // MIGRADO: Selector jQuery
    const saldoContainer = $("#balance");
    if (!saldoContainer.length) return;
    
    let saldoGuardado = localStorage.getItem("saldoActual");

    if (saldoGuardado === null) {
        localStorage.setItem("saldoActual", "0");
        saldoGuardado = "0";
    }

    const saldoNumerico = parseFloat(saldoGuardado);
    
    // MIGRADO: Reemplazo de .textContent por .text()
    saldoContainer.text(`$${saldoNumerico.toLocaleString('es-CL')}`);
}

// MIGRADO: Bloque de eventos luego de la carga del DOM
$(function() {
    // Inicializamos el balance visualizado
    iniciarSaldo();

    // MIGRADO: Seleccionamos todos los enlaces de navegación simultáneamente
    const enlacesNavegacion = $('.link-navegacion');

    if (enlacesNavegacion.length) {
        enlacesNavegacion.on("click", navegarAVista);
    }
});