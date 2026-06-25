/* global $ */
// Utilidades del sitio

/**
 * Guarda una nueva transacción en el historial del localStorage
 * @param {string} tipo - 'Depósito', 'Transferencia enviada', etc.
 * @param {number} monto - El valor numérico de la transacción
 * @param {string} detalle - Información adicional (ej: "A John Doe")
 */

export function registrarTransaccion(tipo, monto, detalle = "") {
    // 1. Obtener el historial existente o crear uno vacío si no hay nada
    let historial = JSON.parse(localStorage.getItem("historialTransacciones")) || [];
    
    // 2. Crear el objeto del nuevo movimiento con la fecha actual
    const nuevaTransaccion = {
        tipo: tipo,
        monto: monto,
        detalle: detalle,
        fecha: new Date().toLocaleDateString('es-CL')
    };
    
    // 3. Guardar en el Local Storage
    historial.unshift(nuevaTransaccion); // Agregamos al inicio
    localStorage.setItem("historialTransacciones", JSON.stringify(historial));
}

// Usar .remove para eliminar botón "ir a menu" en todas las páginas
export function remove_menuButton() {
    // MIGRADO: Buscamos el botón por su ID estandarizado usando jQuery
    const menuBtn = $("#volverMenuBtn");

    // MIGRADO: Validación de existencia segura con .length
    if (!menuBtn.length) {
        return;
    }

    // MIGRADO: Asegurar que su href sea '#' usando .attr()
    menuBtn.attr("href", "#");

    // Obtener la URL actual del navegador
    const urlActual = window.location.href;

    if (urlActual.includes("/login/")) {
        // MIGRADO: jQuery usa .remove()
        menuBtn.remove();
    }
}

export function hideButton(button) {
    // MIGRADO: Validación segura y ocultamiento con el método .hide()
    if (button && button.length) {
        button.hide();
    }
}

export function redirigir(url) {
    if (!url) {
        return console.warn(`Error: URL ${url} no existe`);
    }
        
    window.location.href = url;
}