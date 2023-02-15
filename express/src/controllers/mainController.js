module.exports = {
    // Controladores nuevos (vistas adaptadas a ejs)
    index: (req, res) => { // Vista del Sprint 3 con partials
        let data = {
            style: "home",
            title: "Inicio"
        }
        return res.render("home",{data}); // Renderizo el ejs (res.render) de mi home para que se vea en el navegador
    },
    cart: (req, res) => { // Vista del Sprint 3 con partials
        let data = {
            style: "cart",
            title: "Carrito"
        }
        return res.render("cart",{data}); // Renderizo el ejs (res.render) de mi carrito para que se vea en el navegador
    }
}