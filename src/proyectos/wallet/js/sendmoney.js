/* REQUISITOS 
Agregar evento al botón "Agregar nuevo contacto" para abrir un formulario emergente donde se pueden agregar nuevos contactos.

Este formulario debe pedir los siguientes datos:

Nombre y apellido

número de CBU

Alias

Nombre del Banco

Al seleccionar un contacto y hacer clic en "Enviar dinero", mostrar un mensaje de confirmación y actualizar el saldo de la cuenta en la pantalla del menú principal.

*/

// Bloque de importaciones
import { redirigir, hideButton, registrarTransaccion } from "./utils.js";

// Bloque principal
const listaBancos = [
    "Banco Estado",
    "Banco de Chile",
    "BCI/MACH",
    "MercadoPago"
]

const agendaContactos = [
    { nombre: "John Doe", cbu: "123456789", alias: "john.doe", banco: "ABC Bank" },
    { nombre: "Jane Smith", cbu: "987654321", alias: "jane.smith", banco: "XYZ Bank" }
];

// Variable para controlar contacto elegido
let contactSelect = null;

// Botones y Recursos
let volverMenuBtn, listaAgendaContactos, formularioNewContact, NewContactBtn, sendMoneyBtn;

// Elementos del Modal de Envío
let modalEnvioElement, contactDetailsPreview, modalEnvioLabel, inputMonto, btnConfirmarTransferencia, formularioEnvio;

// Inputs del formulario de Registro de Contacto Nuevo
let inputNombre, inputCBU, inputAlias, selectBanco;

// Escucha de evento de cambio de selección en la lista de contactos
const escucharSeleccionContact = () =>{
    $(".contact-radio").on("change", function(e) {
            const index = $(this).val();
            contactSelect = agendaContactos[index];
            
            // Habilitar el botón principal al seleccionar a alguien
            if (sendMoneyBtn.length) {
                sendMoneyBtn.prop("disabled", false);
            }
    });
};

const renderizarContactos = (contactos = agendaContactos) => {
    // Remover los child nodes y el contenido de la lista de contactos con .empty() para preparar la carga de contactos
    listaAgendaContactos.empty();

    // Recorremos el array y se genera la estructura Bootstrap dinámicamente
    contactos.forEach((contacto) => {
        const i = agendaContactos.findIndex(c => c.cbu === contacto.cbu);

        const itemContacto = `
            <li class="list-group-item">
                <input class="form-check-input contact-radio" type="radio" name="selectedContact" id="contact-${i}" value="${i}">
                <label class="form-check-label w-100" for="contact-${i}">
                    <div class="contact-info">
                        <strong class="contact-name">${contacto.nombre}</strong>
                        <div class="contact-details text-muted small">
                            CBU: ${contacto.cbu} | Alias: ${contacto.alias} | Banco: ${contacto.banco}
                        </div>
                    </div>
                </label>
            </li>
        `;
        
        listaAgendaContactos.append(itemContacto);
    });

    escucharSeleccionContact();
}

const buscarContacto = () => {
    // Captura del texto de la barra de búsqueda
    const textoBusqueda = $("#searchContact").val().toLowerCase();

    // Filtramos la agenda evaluando el nombre del contacto
    const contactosFiltrados = agendaContactos.filter(contacto => {
        return contacto.nombre.toLowerCase().includes(textoBusqueda);
    });

    renderizarContactos(contactosFiltrados);
};

const renderizarListaBancos = () => {
    if (!selectBanco.length) return;
    selectBanco.html('<option value="" selected disabled>Seleccione un banco</option>');

    // Recorrer el array de strings de bancos
    listaBancos.forEach(banco => {
        const opcion = $('<option></option>')
        .val(banco) // Asignando el valor a la opción
        .text(banco); // Asignando texto de la etiqueta option
        
        selectBanco.append(opcion);
    });
};

const cerrarModalForm = (modalId) => {
    $(`#${modalId}`).modal('hide');
}

const agregarNuevoContacto = (e) => {
    e.preventDefault();

    // Limpieza de espacios vacíos
    const nuevoContacto = {
        nombre: inputNombre.val().trim(),
        cbu: inputCBU.val().trim(),
        alias: inputAlias.val().trim(),
        banco: selectBanco.val()
    };

    if (!nuevoContacto.nombre || !nuevoContacto.cbu || !nuevoContacto.banco){
        alert("Completar con: Nombre, CBU y Banco")
        return;
    }
    
    agendaContactos.push(nuevoContacto);

    renderizarContactos();

    formularioNewContact.trigger("reset");

    cerrarModalForm("modalContacto");
}

/*
    Preparar envío | Preview de los datos del contacto
*/

const procesarEnvio = () => {
    if (!contactSelect) return;

    // Cambio del título del modal usando .text()
    modalEnvioLabel.text(`Enviar dinero a: ${contactSelect.nombre}`);

    // Rellenar el contenedor con la información estructurada usando .html() de jQuery
    contactDetailsPreview.html(`
        <div class="mb-2">
            <label class="form-label text-muted small mb-0">Nombre</label>
            <input type="text" class="form-control form-control-sm" value="${contactSelect.nombre}">
        </div>
        <div class="mb-2">
            <label class="form-label text-muted small mb-0">CBU</label>
            <input type="text" class="form-control form-control-sm" value="${contactSelect.cbu}">
        </div>
        <div>
            <label class="form-label text-muted small mb-0">Banco</label>
            <input type="text" class="form-control form-control-sm" value="${contactSelect.banco}">
        </div>
    `);

    // Limpiamos el input del monto usando val()
    inputMonto.val("");
};

/**
    Ejecución de la transacción final | reduce el saldo en localStorage
*/
const ejecutarTransferencia = () => {
    // Capturar el valor usando el selector y método de jQuery .val()
    const montoATransferir = parseFloat(inputMonto.val());
    
    // Obtener fondos del localStorage
    let saldoActual = parseFloat(localStorage.getItem("saldoActual"));

    // Validaciones
    if (isNaN(montoATransferir) || montoATransferir < 1000) {
        alert("El monto mínimo de transferencia debe ser de $1.000");
        return;
    }

    if (montoATransferir > saldoActual) {
        alert(`Saldo insuficiente. Tu saldo actual es de $${saldoActual.toLocaleString('es-CL')}`);
        return;
    }

    // Procesar descuento de fondos
    saldoActual -= montoATransferir;
    localStorage.setItem("saldoActual", saldoActual);
    
    registrarTransaccion("Transferencia", montoATransferir, `A ${contactSelect.nombre}`);
    
    alert(`¡Transferencia exitosa!\nSe enviaron $${montoATransferir.toLocaleString('es-CL')} a ${contactSelect.nombre}.`);
    
    // Resetear el formulario usando .trigger("reset")
    $("#formularioEnvio").trigger("reset");
    
    cerrarModalForm("modalEnvio");

    redirigir("/proyectos/wallet/menu/");
};


$(function() {
    // Botones y Recursos
    volverMenuBtn = $("#volverMenuBtn");
    listaAgendaContactos = $("#contactList");
    formularioNewContact = $("#newContact-form");
    NewContactBtn = $("#newContactForm-submitBtn");
    sendMoneyBtn = $("#sendMoneyBtn");

    // Elementos del Modal de Envío
    modalEnvioElement = $("#modalEnvio");
    contactDetailsPreview = $("#contactDetailsPreview");
    modalEnvioLabel = $("#modalEnvioLabel");
    inputMonto = $("#sendMoneyAmount");
    btnConfirmarTransferencia = $("#confirmSendMoneyBtn");
    formularioEnvio = $("#sendMoney-form");

    // Inputs del formulario de Registro de Contacto Nuevo
    inputNombre = $("#contactName");
    inputCBU = $("#contactCBU");
    inputAlias = $("#contactAlias");
    selectBanco = $("#contactBank");

    // Lista de escucha de eventos
    if (NewContactBtn.length) {
        NewContactBtn.on("click", agregarNuevoContacto);
    }

    if(sendMoneyBtn.length){
        sendMoneyBtn.on("click", procesarEnvio);
    }

    renderizarContactos();
    renderizarListaBancos();

    if (sendMoneyBtn.length) {
        sendMoneyBtn.prop('disabled', true);
    }

    if (btnConfirmarTransferencia.length) {
    btnConfirmarTransferencia.on('click', ejecutarTransferencia);
    } 

    if (volverMenuBtn.length) {
        volverMenuBtn.on("click", (e) => {
            e.preventDefault();
            redirigir("/proyectos/wallet/menu/");
        });
    }

    // Búsqueda del contacto
    const inputBusqueda = $("#searchContact");
    if (inputBusqueda.length) {
        inputBusqueda.on("input", buscarContacto);
    }

});