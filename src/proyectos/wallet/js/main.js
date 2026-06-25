/* global $ */
// Bloque importaciones
import { remove_menuButton } from "./utils.js";

// Bloque principal
const iniciarAplicacion = () => {
    try {
        console.log("Inicializando componentes...");
        const urlActual = window.location.href;

        remove_menuButton();
        
    } catch (error) {
        console.error("Fallo crítico durante el inicio de la app:", error.message);
    };
}

// MIGRADO: Bloque de eventos luego de la carga del DOM
$(function() {
    iniciarAplicacion();
});