/* global $ */
/* REQUISITOS
mostrar una lista con los movimientos realizados y reflejar los detalles de ultimas operaciones
*/

// Bloque de importaciones
import { redirigir } from "./utils.js";

/**
 * Renderiza dinámicamente el historial recuperado desde el localStorage
 */
const cargarHistorial = () => {
    // MIGRADO: Selector jQuery
    const listaMovimientos = $("#listaMovimientos");
    if (!listaMovimientos.length) return;

    // Recuperar historial de movimientos desde el LocalStorage
    const historial = JSON.parse(localStorage.getItem("historialTransacciones")) || [];

    // MIGRADO: Limpieza de contenedor con .html("")
    listaMovimientos.html("");

    // Recorrer transacciones guardadas
    historial.forEach(tx => {
        // MIGRADO: Creación e inyección del item
        const itemMovimiento = `
            <li class="list-group-item">
                <div>
                    <strong class="d-block text-dark">${tx.tipo}</strong>
                    <span class="text-muted small">${tx.fecha} ${tx.detalle}</span>
                </div>
                <span>
                    $${tx.monto.toLocaleString('es-CL')}
                </span>
            </li>`;
        
        // Adjuntamos el elemento a la lista
        listaMovimientos.append(itemMovimiento);
    });
};

// MIGRADO: Bloque de eventos luego de la carga del DOM
$(function() {
    // Cargamos el historial inmediatamente al estar listo el DOM
    cargarHistorial();

    const volverMenuBtn = $("#volverMenuBtn");
    if (volverMenuBtn.length) {
        volverMenuBtn.on("click", () => redirigir("/proyectos/wallet/menu/"));
    }
});