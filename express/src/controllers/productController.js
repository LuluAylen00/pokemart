require('plus-methods')
const model = require('../models/productModel');
const { validationResult } = require('express-validator')
const db = require('../database/models')
const fs = require('fs')
const path = require('path');
const { parseQuery } = require('../models/productModel');


module.exports = {
    // Controladores nuevos (Sprint 3 en adelante)
    create: async (req, res) => {
        let data = {
            style: "productCreate",
            title: "Añadir un producto",
        };
        try {
            data.cats = await db.Subcategory.findAll();
            data.gens = await db.Gen.findAll();
        } catch (error) {
            console.log(error);
        }
        res.render("products/create", { data, errors: null });
    },
    save: async (req, res) => {
        const result = validationResult(req);
        if(!result.isEmpty()){
            if (req.file) {
                fs.unlinkSync(path.resolve(__dirname,"../../public/img/items",req.file.filename))
            }
            let errores = result.mapped();
            let data = {
                style: "productCreate",
                title: "Añadir un producto"
            };
            try {
                data.cats = await db.Subcategory.findAll();
                data.gens = await db.Gen.findAll();
            } catch (error) {
                console.log(error);
            }
            return res.render('products/create',{
                style: "access",
                title: "Ingreso",
                errors: {
                    fields: errores,
                    values: req.body
                },
                data
            })
        }
        let data = {
            name: req.body.name,
            description: req.body.description,
            subcategoryId: parseInt(req.body.category),
            price: parseInt(req.body.price),
            picture: req.file.filename,
            genId: parseInt(req.body.gen)
        };
        
        let json = model.read();
        json.data.push(model.convertToQuery(data));
        model.write(json);

        try {
            await db.Item.create(data)
        } catch (error) {
            console.log(error);
        }

        return res.redirect("/products");
    },/*
    all: (req, res) => {
        let data = {
            style: "productList",
            title: "Listado de productos",
            products: model.all(),
            category: req.params.category ? req.params.category : "Todos" 
        };
        res.render("products/list", { data });
    },*/
    category: async (req, res) => {
        let data = {
            style: "productList",
            title: "Listado de productos",
            category: req.params.subcategory ? req.params.subcategory : req.params.category ? req.params.category : "Todos"
        }
        //model.parseQuery();
        try {
            data.catList = await db.Subcategory.findAll({include: ["category"]});
            let products = await db.Item.findAll({include: [{
                model: db.Subcategory,
                as: 'category',
                include: ['category']},"generation"]
            });
            //console.log(products[0].category);
           //res.send(products.group(({category}) => category.name));
            data.products = req.params.subcategory ? products.group(({category}) => category.name)[req.params.subcategory] : req.params.category ? products.group(({category}) => category.category.name)[req.params.category] : products;            
        } catch (error) {
            console.log(error);
        }
        return res.render("products/list", { data });
    },
    show: async (req, res) => {
        let data = {
            style: "product",
            title: "Información del producto",
        };

        try {
            data.thisOne = await db.Item.findByPk(req.params.id,{include: ["category","generation"]});
            let products = await db.Item.findAll({include: ["category","generation"]});
            
            data.products = model.random(6, products).filter(p => p.id != req.params.id);
        } catch (error) {
            console.log(error);
        }

        return res.render("products/detail", {data})
    },
    edit: async (req, res) => {
        let data = {
            style: "productCreate",
            title: "Añadir un producto"
        };

        try {
            data.product = await db.Item.findByPk(req.params.id, { include: ["category","generation"]});
            data.cats = await db.Category.findAll();
            data.gens = await db.Gen.findAll();
        } catch (error) {
            console.log(error);
        }
        res.render("products/edit", { data });
    },
    update: async (req, res) => {
        let data = {
            name: req.body.name,
            categoryId: parseInt(req.body.category),
            price: parseInt(req.body.price),
            description: req.body.description,
            genId: parseInt(req.body.gen)
        }
        try {
            let item = await db.Item.findByPk(req.body.id);
            data.picture = req.file && req.file.filename ? req.file.filename : item.picture;
            db.Item.update(data,{where: {id: req.body.id}})
        } catch (error) {
            console.log(error);
        }

        res.redirect("/products/detail/"+req.body.id)
    },
    erase: async (req, res) => {
        try {
            await db.Item.destroy({where: {id: req.params.id}})
        } catch (error) {
            console.log(error);
        }

        res.redirect("/products");
    },
    buy: async (req, res)=> {
        let data = JSON.parse(req.body.order);
        console.log(data);
        let products
        try {
            products = await db.Item.findAll();
            let order = await db.Order.create({
                trainerId: req.session.user.id,
                status: 1
            })
            
            
            data.forEach(async o => {
                try {
                    await db.Orderitem.create({
                        itemId: parseInt(o.id),
                        quantity: o.quantity,
                        orderId: order.id
                    })
                } catch (error) {
                    console.log(error);
                }
            })

        } catch (error) {
            console.log(error);
        }
        res.redirect("/cart");
    }
};