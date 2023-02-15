require('plus-methods')
const db = require('../../database/models');
const sequelize = require('sequelize')

module.exports = {
    most: async (req, res) => {
        let data = {
            meta: {
                status: 0
            },
            data: []
        }
        try {
            data.data = await db.Subcategory.findAll({
                include: [
                    {association: "items"},
                    {association: "category"}
                ],
                attributes: {
                    include: [
                    [
                        sequelize.literal(`(
                            SELECT COUNT(*)
                            FROM Items 
                            WHERE Items.subcategoryid = Subcategory.id
                        )`),
                        'ProdCount'
                    ]
                ]},
                order : [[sequelize.literal('ProdCount'), 'DESC']],
                limit: 3
            }).then((p) => {
                return p.map((item) => {
                    item.icon = "http://localhost:3151/img/items/" + item.icon
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
    },
    show: async (req, res) => {
        let data = {
            meta: {
                status: 0
            },
            data: []
        }
        try {
            data.data = await db.Category.findByPk(req.params.id);
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
    all: async (req, res) => {
        let data = {
            meta: {
                status: 0
            },
            data: []
        }
        try {
            data.data = await db.Subcategory.findAll();
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
};