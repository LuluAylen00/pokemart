module.exports = {
    // Controladores nuevos (vistas adaptadas a ejs)
    index: (req, res) => { // Vista del Sprint 3 con partials
        return res.render("home"); // Renderizo el ejs (res.render) de mi home para que se vea en el navegador
    },
    cart: (req, res) => { // Vista del Sprint 3 con partials
        return res.render("cart"); // Renderizo el ejs (res.render) de mi carrito para que se vea en el navegador
    }
}