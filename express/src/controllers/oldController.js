module.exports = {
    // Controladores viejos (vistas sin adaptar a ejs)
    oldIndex: (req, res) => { // Vista del Sprint 2 convertida a ejs
        return res.render("old/oldHome"); // Renderizo el ejs (res.render) de mi home para que se vea en el navegador
    },
    oldCart: (req, res) => { // Vista del Sprint 2 convertida a ejs
        return res.render("old/oldCart"); // Renderizo el ejs (res.render) de mi carrito para que se vea en el navegador
    },
    oldAccess: (req, res) => { // Vista del Sprint 2 convertida a ejs
        return res.render("old/oldAccess"); // Renderizo el ejs (res.render) de mi login/registro para que se vea en el navegador
    },
    oldProduct: (req, res) => { // Vista de detalle del producto del Sprint 2
        return res.render("old/Oldproduct"); // Renderizo el ejs (res.render) para que se vea en el navegador
    },
};