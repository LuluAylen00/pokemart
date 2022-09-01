const model = require('../models/productModel');
const productModel = require('../models/productModel')

module.exports = {
    // Controladores nuevos (Sprint 3 en adelante)
    create: (req, res) => {
        let data = {
            style: "productCreate",
            title: "Añadir un producto"
        };
        res.render("products/create", { data });
    },
    save: (req, res) => {
        let product = model.generate(req.body, req.file);
        model.write(product);
        return res.redirect("/products");
    },
    all: (req, res) => {
        let data = {
            style: "product",
            title: "Añadir un producto"
        };
        res.render("products/list", { data });
    },
    show: (req, res) => {
        let data = {
            style: "product",
            title: "Información del producto"
        };
        return res.render("products/detail", {data})
    },
    edit: (req, res) => {
        let data = {
            style: "product",
            title: "Añadir un producto"
        };
        res.render("products/edit", { data });
    },
    update: (req, res) => {},
    erase: (req, res) => {}
};