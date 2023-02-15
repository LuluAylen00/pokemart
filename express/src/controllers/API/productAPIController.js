require('plus-methods')
const db = require('../../database/models')

module.exports = {
    all: async (req, res) => {
        let data = {
            meta: {
                status: 0
            },
            data: []
        }
        try {
            let products = await db.Item.findAll({include: ["category","generation"]})
            data.data = products.map((item) => {
                item.picture = "http://localhost:3151/img/items/" + item.picture
                return item
            })
            data.meta.count = data.data.length;
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
                status: 0
            },
            data: []
        }
        try {
            data.data = await db.Item.findByPk(req.params.id,{include: ["category","generation"]})
            .then(p => {
                p.picture = "http://localhost:3151/img/items/" + p.picture
                return p
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
    },
    last: async (req, res) => {
        let data = {
            meta: {
                status: 0
            },
            data: []
        }
        try {
            data.data = await db.Item.findAll({
                include: ["category","generation"],
                order: [ ["id", "DESC"]],
                limit: 3
            }).then((p) => {
                return p.map((item) => {
                    item.picture = "http://localhost:3151/img/items/" + item.picture
                    return item
                })
            })
            data.meta.count = data.data.length;
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