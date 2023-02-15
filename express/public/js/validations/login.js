window.addEventListener('load', function(){
    

    let form = document.getElementById("login-form")
    let fields = {
        email: {
            input: document.getElementById("login-email"),
            error: document.getElementById("error-login-email-f"),
            status: false
        },
        password: {
            input: document.getElementById("login-password"),
            error: document.getElementById("error-login-password-f"),
            status: false
        }
    }

    fields.email.input.addEventListener('focusout', (e)=>{
        if (e.target.value == "") {
            fields.email.error.innerHTML = "<p>Debes llenar el campo de correo</p>"
            fields.email.status = false;
        } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(e.target.value)) {
            fields.email.error.innerHTML = "<p>El formato de correo es incorrecto!</p>"
            fields.email.status = false;
        } else {
            fields.email.error.innerHTML = "";
            fields.email.status = true;
        }
    })

    fields.password.input.addEventListener('focusout', (e)=>{
        if (e.target.value == "") {
            fields.password.error.innerHTML = "<p>Debes escribir la contraseña</p>"
            fields.password.status = false;
        } else {
            fields.password.error.innerHTML = "";
            fields.password.status = true;
        }
    })

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        let validate = Object.keys(fields);
        let status = 0
        validate.forEach(f => {
            if (!fields[f].status) {
                status++
            }
        })
        if (status == 0) {
            form.submit();
        } else {
            if (fields.email.input.value == "") {
                fields.email.error.innerHTML = "<p>Debes llenar el campo de correo</p>"
                fields.email.status = false;
            } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(fields.email.input.value)) {
                fields.email.error.innerHTML = "<p>El formato de correo es incorrecto!</p>"
                fields.email.status = false;
            } else {
                fields.email.error.innerHTML = "";
                fields.email.status = true;
            }
            if (fields.password.input.value == "") {
                fields.password.error.innerHTML = "<p>Debes escribir la contraseña</p>"
                fields.password.status = false;
            } else {
                fields.password.error.innerHTML = "";
                fields.password.status = true;
            }
        }
    })

})