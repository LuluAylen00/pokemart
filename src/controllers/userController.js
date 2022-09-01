module.exports = {
    // Controladores nuevos (Sprint 3 en adelante)
    register: (req, res) => {
        let data = {
            style: "access",
            title: "Ingreso"
        };
        return res.render("users/access", {data}); // Renderizo el ejs (res.render) de mi login/registro para que se vea en el navegador
    },
    save: (req, res) => {},
    all: (req, res) => {},
    profile: (req, res) => {},
    edit: (req, res) => {},
    update: (req, res) => {},
    erase: (req, res) => {},
    connect: (req, res) => {},
};