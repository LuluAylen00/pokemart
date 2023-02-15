window.addEventListener('load', function(){
    

    let form = document.getElementById("register-form")
    let fields = {
        username: {
            input: document.getElementById("username"),
            error: document.getElementById("error-register-username-f"),
            status: false
        },
        email: {
            input: document.getElementById("email"),
            error: document.getElementById("error-register-email-f"),
            status: false
        },
        emailConf: {
            input: document.getElementById("emailConf"),
            error: document.getElementById("error-register-emailConf-f"),
            status: false
        },
        password: {
            input: document.getElementById("password"),
            error: document.getElementById("error-register-password-f"),
            status: false
        },
        passwordConf: {
            input: document.getElementById("passwordConf"),
            error: document.getElementById("error-register-passwordConf-f"),
            status: false
        },
        region: {
            input: document.getElementById("region-select"),
            error: document.getElementById("error-register-region-f"),
            status: false
        },
        city: {
            input: document.getElementById("city-select"),
            error: document.getElementById("error-register-city-f"),
            status: false
        },
        avatar: {
            input: document.getElementsByName("avatar"),
            error: document.getElementById("error-register-avatar-f"),
            status: false
        },
    }

    fields.username.input.addEventListener('focusout', (e)=>{
        if (e.target.value == "") {
            fields.username.error.innerHTML = "<p>Debes llenar el campo de nombre de usuario</p>"
            fields.username.status = false;
        } else if (e.target.value.length < 5) {
            fields.username.error.innerHTML = "<p>El nombre de usuario debe tener al menos 5 caracteres</p>"
            fields.username.status = false;
        } else {
            fields.username.error.innerHTML = "";
            fields.username.status = true;
        }
    })

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

    fields.emailConf.input.addEventListener('focusout', (e)=>{
        if (e.target.value == "") {
            fields.emailConf.error.innerHTML = "<p>Debes confirmar el correo</p>"
            fields.emailConf.status = false;
        } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(e.target.value)) {
            fields.emailConf.error.innerHTML = "<p>El formato de correo es incorrecto!</p>"
            fields.emailConf.status = false;
        } else if (e.target.value != fields.email.input.value) {
            fields.emailConf.error.innerHTML = "<p>Las direcciones de correo deben coincidir!</p>"
            fields.emailConf.status = false;
        } else {
            fields.emailConf.error.innerHTML = "";
            fields.emailConf.status = true;
        }
    })

    fields.password.input.addEventListener('focusout', (e)=>{
        if (e.target.value == "") {
            fields.password.error.innerHTML = "<p>Debes escribir la contraseña</p>"
            fields.password.status = false;
        } else if (!/^(?=.*?[a-z])(?=.*?[0-9]).{5,}$/.test(e.target.value)){
            fields.password.error.innerHTML = "<p>La contraseña debe contener al menos 5 dígitos, una letra y un número</p>"
            fields.password.status = false;
        } else {
            fields.password.error.innerHTML = "";
            fields.password.status = true;
        }
    })

    fields.passwordConf.input.addEventListener('focusout', (e)=>{
        if (e.target.value == "") {
            fields.passwordConf.error.innerHTML = "<p>Debes confirmar la contraseña</p>"
            fields.passwordConf.status = false;
        } else if (e.target.value != fields.password.input.value) {
            fields.passwordConf.error.innerHTML = "<p>La contraseña no coincide!</p>"
            fields.passwordConf.status = false;
        } else {
            fields.passwordConf.error.innerHTML = "";
            fields.passwordConf.status = true;
        }
    })

    fields.region.input.addEventListener('focusout', (e)=>{
        if (e.target.value == "") {
            fields.region.error.innerHTML = "<p>Debes seleccionar una región</p>"
            fields.region.status = false;
        } else {
            fields.region.error.innerHTML = "";
            fields.region.status = true;
        }
    })

    fields.city.input.addEventListener('focusout', (e)=>{
        if (e.target.value == "") {
            fields.city.error.innerHTML = "<p>Debes seleccionar una ciudad</p>"
            fields.city.status = false;
        } else {
            fields.city.error.innerHTML = "";
            fields.city.status = true;
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
            // Username
            if (fields.username.input.value == "") {
                fields.username.error.innerHTML = "<p>Debes llenar el campo de nombre de usuario</p>"
                fields.username.status = false;
            } else if (fields.username.input.value.length < 5) {
                fields.username.error.innerHTML = "<p>El nombre de usuario debe tener al menos 5 caracteres</p>"
                fields.username.status = false;
            } else {
                fields.username.error.innerHTML = "";
                fields.username.status = true;
            }

            // Email
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

            // Email confirmation
            if (fields.emailConf.input.value == "") {
                fields.emailConf.error.innerHTML = "<p>Debes confirmar el correo</p>"
                fields.emailConf.status = false;
            } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(fields.emailConf.input.value)) {
                fields.emailConf.error.innerHTML = "<p>El formato de correo es incorrecto!</p>"
                fields.emailConf.status = false;
            } else if (fields.emailConf.input.value != fields.email.input.value) {
                fields.emailConf.error.innerHTML = "<p>Las direcciones de correo deben coincidir!</p>"
                fields.emailConf.status = false;
            } else {
                fields.emailConf.error.innerHTML = "";
                fields.emailConf.status = true;
            }

            // Password
            if (fields.password.input.value == "") {
                fields.password.error.innerHTML = "<p>Debes escribir la contraseña</p>"
                fields.password.status = false;
            } else if (!/^(?=.*?[a-z])(?=.*?[0-9]).{5,}$/.test(fields.password.input.value)){
                fields.password.error.innerHTML = "<p>La contraseña debe contener al menos 5 dígitos, una letra y un número</p>"
                fields.password.status = false;
            } else {
                fields.password.error.innerHTML = "";
                fields.password.status = true;
            }
            
            // Password Confirmation
            if (passwordConf.value == "") {
                fields.passwordConf.error.innerHTML = "<p>Debes confirmar la contraseña</p>"
                fields.passwordConf.status = false;
            } else if (passwordConf.value != fields.password.input.value) {
                fields.passwordConf.error.innerHTML = "<p>La contraseña no coincide!</p>"
                fields.passwordConf.status = false;
            } else {
                fields.passwordConf.error.innerHTML = "";
                fields.passwordConf.status = true;
            }

            // Region
            if (fields.region.input.value == "") {
                fields.region.error.innerHTML = "<p>Debes seleccionar una región</p>"
                fields.region.status = false;
            } else {
                fields.region.error.innerHTML = "";
                fields.region.status = true;
            }
    
            // City
            if (fields.city.input.value == "") {
                fields.city.error.innerHTML = "<p>Debes seleccionar una ciudad</p>"
                fields.city.status = false;
            } else {
                fields.city.error.innerHTML = "";
                fields.city.status = true;
            }

            // Avatar
            for (let i = 0; i < fields.avatar.input.length; i++) {
                const avatar = fields.avatar.input[i];
                if(avatar.checked) {
                    fields.avatar.status = true;
                } else {
                    avatar.addEventListener('change', (e) => {avatar.checked ? fields.avatar.error.innerHTML = "" : ""})
                }
            }
            if (!fields.avatar.status) {
                fields.avatar.error.innerHTML = "<p>Debes seleccionar un avatar, podrás cambiarlo mas adelante</p>"
            } else {
                fields.avatar.error.innerHTML = "";
            }
        }
    })

})