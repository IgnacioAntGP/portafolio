/* global $ */
/* REQUERIMIENTOS 

Implementa la funcionalidad de validar las credenciales ingresadas utilizando JavaScript. Si las credenciales son correctas, mostra un mensaje de éxito y redirige a la pantalla del menú principal (menu.html). Si las credenciales son incorrectas, mostrar un mensaje de error.

El boton de menu principal no debe verse en la pantalla login, ya que ahora tenemos que poder redirigir a la pantalla menú con el inicio de login
*/

// Bloque importaciones
import {redirigir} from "./utils.js";

// Bloque principal de reglas del negocio
// Login

const validar_email = () => {
    const email = $("#email").val().trim();
    const errorContainer = $("#validateEmailResponse");
    let response;
    
    errorContainer.html("");

    // Aquí se va a comprobar posteriormente a emails de usuarios guardados en una db
    if (!email || email != "user@gmail.com") {
        response = "Correo no válido"
        errorContainer.html(response)
        return false;
    }
    else{
        return true;
    }
}

const validar_pass = () => {
    const pass = $("#password").val();
    const errorContainer = $("#validatePassResponse");
    let response;

    errorContainer.html("");

    // Aquí se va a comprobar posteriormente a passswords de usuarios guardados en una db
    if (!pass || pass != "1234") {
        response = "Contraseña no válida"
        errorContainer.html(response)
        return false;
    }
    else{
        return true;
    }
}

const login = (e) => {
    e.preventDefault();

    let isValidEmail = validar_email();
    let isValidPass = validar_pass();

    let url = "/proyectos/wallet/menu/";
    const loginResponseContainer = $("#loginResponse");
    let response; 

    if (!isValidPass || !isValidEmail){
        if(loginResponseContainer.length){
            response = "Ingreso no válido, verifique sus credenciales"
            loginResponseContainer.html(response);
            return;
        } 
        return;
    }
    else{
        if (loginResponseContainer.length){
            response = "Ingresando a la aplicación..."
            loginResponseContainer.html(response)
        }
        setTimeout(redirigir, 1000, url);
    }
}

// Captura de evento de submit del formulario
$(function(){
    const formularioLogin = $("#login-form");
    
    if (formularioLogin){
        formularioLogin.on("submit", login);
    }
});