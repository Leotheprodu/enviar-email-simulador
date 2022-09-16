//Variables
const btnEnviar = document.querySelector('#enviar');
const btnResetear = document.querySelector('#resetBtn');
const formulario = document.querySelector('#enviar-mail');

//Variables para Campos
const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');
const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


eventListeners()

function eventListeners() {

    document.addEventListener('DOMContentLoaded',iniciarApp);

    email.addEventListener('blur', validarFormulario);
    asunto.addEventListener('blur', validarFormulario);
    mensaje.addEventListener('blur', validarFormulario);

    formulario.addEventListener('submit', enviarEmail);
    btnResetear.addEventListener('click' , resetearFormulario);
}

//Funciones
function iniciarApp() {

    btnEnviar.disabled = true;
    btnEnviar.classList.add('cursor-not-allowed' , 'opacity-50');

}

function validarFormulario(e) {
    if(e.target.value.length > 0) {

        borrarErrorText()
        e.target.classList.remove('border', 'border-red-500');
        e.target.classList.add('border', 'border-green-500');

    }else {

        borrarErrorText()
        e.target.classList.remove('border', 'border-green-500');
        e.target.classList.add('border', 'border-red-500');
        
        mostrarError('todos los campos son obligatorios');
    }

    if(e.target.type === 'email') {
        
        if(er.test( e.target.value)) {

            borrarErrorText()
            e.target.classList.remove('border', 'border-red-500');
            e.target.classList.add('border', 'border-green-500');

        }else {

            borrarErrorText()
            e.target.classList.remove('border', 'border-green-500');
            e.target.classList.add('border', 'border-red-500');
            mostrarError('email no valido');

        }

    }

    if(er.test( email.value ) && asunto.value !== "" && mensaje.value !== "" ) {

        btnEnviar.disabled = false;
        btnEnviar.classList.remove('cursor-not-allowed' , 'opacity-50');
    }else {

        btnEnviar.disabled = true;
        btnEnviar.classList.add('cursor-not-allowed' , 'opacity-50'); 
    }

}

function mostrarError(mensaje) {

    mensajeError = document.createElement('p');
    mensajeError.textContent = mensaje;
    mensajeError.classList.add('border' , 'border-red-500' , 'background-red-100', 'text-red-500' , 'p-3', 'mt-5' , 'text-center' , 'error');

    const errores = document.querySelectorAll('.error');

    if(errores.length === 0) {
        formulario.appendChild(mensajeError);  
    }
}

function borrarErrorText(){

    const errorText = document.querySelector('p.error');
    if (errorText) {
        errorText.remove();
    }
}
function enviarEmail(e){

    e.preventDefault();

    const spinner = document.querySelector('#spinner');
    spinner.style.display = 'flex';
    
    setTimeout(() => {

        spinner.style.display = 'none';
        const parrafo = document.createElement('p');

        parrafo.textContent = 'El mensaje se ha enviado correctamente';
        parrafo.classList.add('text-center' , 'my-10' , 'p-2' , 'bg-green-500' , 'text-white' , 'font-bold' , 'uppercase');
        formulario.insertBefore(parrafo , spinner);

        setTimeout(() => {
            parrafo.remove();
            resetearFormulario();
            iniciarApp();
        }, 3000);

    }, 3000);
}

function resetearFormulario(){

    formulario.reset();
    borrarErrorText()

    email.classList.remove('border', 'border-red-500');
    asunto.classList.remove('border', 'border-red-500');
    mensaje.classList.remove('border', 'border-red-500');
}