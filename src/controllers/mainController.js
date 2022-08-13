module.exports = {
    index: (req, res) => {
        return res.render("home"); // Renderizo el ejs (res.render) de mi home para que se vea en el navegador
    },
    cart: (req, res) => { 
        return res.render("cart"); // Renderizo el ejs (res.render) de mi carrito para que se vea en el navegador
    },
    access: (req, res) => { 
        return res.render("users/access"); // Renderizo el ejs (res.render) de mi login/registro para que se vea en el navegador
    }
}