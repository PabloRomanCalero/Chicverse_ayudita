
document.addEventListener('DOMContentLoaded', function() {
    let form = document.getElementById('form');
    let submitButton = document.querySelector('.boton-enviar'); 

    submitButton.addEventListener('click', function(event) {
        event.preventDefault();
        let isValid = true;

        let errorMessages = document.querySelectorAll('.error');
        errorMessages.forEach(message => message.remove());

        let name = document.getElementById('name');
        if (name.value.trim() === '') {
            isValid = false;
            showError(name, 'El nombre es obligatorio');
        }

        let surname = document.getElementById('surname');
        if (surname.value.trim() === '') {
            isValid = false;
            showError(surname, 'El primer apellido es obligatorio');
        }

        let dni = document.getElementById('dni');
        if (dni.value.trim() === '') {
            isValid = false;
            showError(dni, 'El DNI es obligatorio');
        }

        let phone = document.getElementById('phone');
        if (phone.value.trim() === '') {
            isValid = false;
            showError(phone, 'El número de teléfono es obligatorio');
        }

        let birthdate = document.getElementById('birthdate');
        if (birthdate.value.trim() === '') {
            isValid = false;
            showError(birthdate, 'La fecha de nacimiento es obligatoria');
        }

        let username = document.getElementById('username');
        if (username.value.trim() === '') {
            isValid = false;
            showError(username, 'El nombre de usuario es obligatorio');
        }

        let email = document.getElementById('email');
        let emailVerificar = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!email.value.match(emailVerificar)) {
            isValid = false;
            showError(email, 'El correo electrónico no es válido');
        }

        let password = document.getElementById('password');
        let confirmarPassword = document.getElementById('confirmar-password');
        if (password.value.trim() === '') {
            isValid = false;
            showError(password, 'La contraseña es obligatoria');
        }
        if (confirmarPassword.value.trim() === '') {
            isValid = false;
            showError(confirmarPassword, 'Confirmar la contraseña es obligatorio');
        }
        if (password.value !== confirmarPassword.value) {
            isValid = false;
            showError(password, 'Las contraseñas no coinciden');
            showError(confirmarPassword, 'Las contraseñas no coinciden');
        }
        console.log("A0");
        if (isValid) {
            form.submit(); 
        }
    });

    function showError(input, message) {
        let errorMessage = document.createElement('div');
        errorMessage.classList.add('error');
        errorMessage.textContent = message;
        input.parentElement.appendChild(errorMessage);
    }
});

