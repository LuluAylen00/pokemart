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
        console.log(req.file);
        model.write(product);
        return res.redirect("/products");
    },
    all: (req, res) => {
        let data = {
            style: "productList",
            title: "Listado de productos",
            products: model.all(),
            category: req.params.category ? req.params.category : "Todos"
        };
        res.render("products/list", { data });
    },
    category: (req, res) => {
        let products = model.all();
        products = products.filter(p => p.category == req.params.category);
        let data = {
            style: "productList",
            title: "Listado de productos",
            products: products,
            category: req.params.category ? req.params.category : "Todos"
        };
        res.render("products/list", { data });
    },
    show: (req, res) => {
        let products = model.all();
        let product = model.one(req.params.id);
        let data = {
            style: "product",
            title: "Información del producto",
            thisOne: product,
            products: model.random(6),
        };
        return res.render("products/detail", {data})
    },
    edit: (req, res) => {
        let data = {
            style: "productCreate",
            title: "Añadir un producto",
            product: model.one(req.params.id)
        };
        res.render("products/edit", { data });
    },
    update: (req, res) => {
        let newList = model.update(req.body, req.file);
        model.write(newList);
        res.redirect("/products/detail/"+req.params.id)
    },
    erase: (req, res) => {
        let newList = model.erase(req.params.id);
        model.write(newList);
        res.redirect("/products");
    }
};