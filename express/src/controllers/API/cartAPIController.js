require('plus-methods')
const requester = require('./routes')
const db = require('../../database/models')
const sequelize = require('sequelize')

module.exports = {
    all: async (req, res) => {
        let data = {
            meta: {
                status: 0,
                link: requester("orders")
            },
            data: []

        }
        try {
            data.data = await db.Order.findAll({include: ["user",{model: db.Orderitem, as: "products", include: [{model: db.Item, as: "product", include: [{model: db.Subcategory, as: "category", include: ["category"]}]}]}]});
            let bigAcc = 0; // Acumulador del total de todas las compras
            let ordersAcc = 0; // Acumulador de items comprados
            data.data.forEach((ord,i) => {
                let acc = 0 // Acumulador de monto de ESTA compra

                data.data[i].products.forEach((order,z)=>{
                    acc += order.quantity * order.product.price // Acumulando valor de ESTE elemento

                    // Añado el enlace a la API del producto de esta orden
                    data.data[i].products[z].product.dataValues.link = requester("products", data.data[i].products[z].itemId)
                
                    // Añado el enlace a la API de la subcategoría del producto de esta orden
                    data.data[i].products[z].product.category.dataValues.link = requester("subcategories", data.data[i].products[z].product.category.id)

                    // Añado el enlace a la API de la subcategoría del producto de esta orden
                    data.data[i].products[z].product.category.category.dataValues.link = requester("categories", data.data[i].products[z].product.category.categoryId)
                })

                data.data[i].dataValues.amount = acc;
                data.data[i].dataValues.detail = requester("orders",ord.id);
                data.data[i].user.dataValues.link = requester("users", data.data[i].user.id)
                ordersAcc += data.data[i].products.length
                bigAcc += acc;
            })
            data.meta.trades = data.data.length;
            data.meta.total = bigAcc;
            data.meta.orders = ordersAcc;
            if (data.data) {
                data.meta.status = 200
            } else {
                data.meta.status = 404
            }
        } catch (error) {
            console.log(error);
            if (data.data) {
                data.meta.status = 500
            }
        }
        return res.send(data);
    },
    show: async (req, res) => {
        let data = {
            meta: {
                status: 0,
                link: requester("orders",req.params.id)
            },
            data: []
        }
        try {
            data.data = await db.Order.findByPk(req.params.id,{include: ["user",{model: db.Orderitem, as: "products", include: [{model: db.Item, as: "product", include: [{model: db.Subcategory, as: "category", include: ["category"]}]}]}]});
            let acc = 0
            data.data.products.forEach((order)=>{acc += order.quantity * order.product.price})
            data.data.dataValues.amount = acc;
            if (data.data) {
                data.meta.status = 200
            } else {
                data.meta.status = 404
            }
        } catch (error) {
            console.log(error);
            if (data.data) {
                data.meta.status = 500
            }
        }
        return res.send(data);
    },
    topBought: async (req, res) => {
        let data = {
            meta: {
                status: 0,
                link: requester("orders", "topBought")
            },
            data: []

        }
        try {
            data.data = await db.Item.findAll({
                include: ["category","orders"],
                attributes: {
                    include: [
                    [
                        sequelize.literal(`(
                            SELECT COUNT(*)
                            FROM Orderitems 
                            WHERE Orderitems.itemId = Item.id
                        )`),
                        'OrderCount'
                    ]
                ]},
                order: [ [ "OrderCount", "DESC" ] ]
            });

            if (data.data) {
                data.meta.status = 200
            } else {
                data.meta.status = 404
            }
        } catch (error) {
            console.log(error);
            if (data.data) {
                data.meta.status = 500
            }
        }
        return res.send(data);
    },
    topBuyers: async (req, res) => {
        let data = {
            meta: {
                status: 0,
                link: requester("orders", "topBuyers")
            },
            data: []

        }
        try {
            data.data = await db.User.findAll({
                include: ["orders"],
                attributes: {
                    include: [
                    [
                        sequelize.literal(`(
                            SELECT COUNT(*)
                            FROM Orders 
                            WHERE Orders.trainerId = User.id
                        )`),
                        'OrderCount'
                    ]
                ]},
                order: [ [ "OrderCount", "DESC" ] ]
            }).then((r) => {
                return r.filter(u => {
                    return u.dataValues.OrderCount > 0
                })
            })

            if (data.data) {
                data.meta.status = 200
            } else {
                data.meta.status = 404
            }
        } catch (error) {
            console.log(error);
            if (data.data) {
                data.meta.status = 500
            }
        }
        return res.send(data);
    }
};