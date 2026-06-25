/* global $ */
/* REQUERIMIENTOS 

Implementa la funcionalidad de actualizar el saldo de la cuenta con el monto depositado y mostrar el nuevo saldo en la pantalla del menú principal al hacer clic en "Realizar depósito". (Incrementando el monto inicial)

*/

// Bloque de importaciones
import { redirigir, registrarTransaccion } from "./utils.js";

// Bloque principal
const validarMonto = (montoDeposito) => {
    // Validación de montos vacíos o negativos
    if (isNaN(montoDeposito) || montoDeposito <= 1000) {
        alert("Por favor, ingrese un monto válido.");
        return false;
    }
    return true;
}

const procesarDeposito = (e) => {
    e.preventDefault();

    // MIGRADO: Selector de jQuery
    const inputMonto = $("#depositAmount");
    if (!inputMonto.length) return;

    // MIGRADO: Extracción del valor con .val()
    const montoDeposito = parseFloat(inputMonto.val());

    // Traer el saldo que está guardado en el localStorage
    let saldoActual = localStorage.getItem("saldoActual");
    
    // Validación de saldo Nulo
    if (!validarMonto(montoDeposito)) return;

    const nuevoSaldo = parseFloat(saldoActual) + montoDeposito;

    localStorage.setItem("saldoActual", nuevoSaldo.toString());

    registrarTransaccion("Deposito", montoDeposito, "Deposito en cuenta");

    alert(`¡Depósito exitoso!\nSe han sumado $${montoDeposito.toLocaleString('es-CL')}`);
    
    setTimeout(redirigir, 1000, "/proyectos/wallet/menu/");
};

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
    const formularioDeposito = $("#deposit-form");
    const volverMenuBtn = $("#volverMenuBtn");

    // Evaluamos de forma correcta la existencia del formulario
    if (formularioDeposito.length) {
        formularioDeposito.on("submit", procesarDeposito);
    }

    iniciarSaldo();

    if ($(volverMenuBtn).length) {

        $(volverMenuBtn).on("click", (e) => {
            e.preventDefault();
            redirigir("/proyectos/wallet/menu/");
        });
    }
});