require('plus-methods')
const requester = require('./routes')
const db = require('../../database/models')

module.exports = {
    all: async (req, res) => {
        let data = {
            meta: {
                status: 0,
                link: requester("users")
            },
            data: []

        }
        try {
            data.data = await db.User.findAll({include: ["avatar",{ model: db.City, as: "city", include: ["region"] },"role"]})
            .then(users => {
                return users.map((user) => {
                    user.avatar.filename = "http://localhost:3151/img/avatar/" + user.avatar.filename
                    return user;
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
                status: 0,
                link: requester("users",req.params.id)
            },
            data: {}
        }
        try {
            data.data = await db.User.findByPk(req.params.id,{include: ["avatar",{ model: db.City, as: "city", include: ["region"] },"role","messages"]})
            .then((user) => {
                user.avatar.filename = "http://localhost:3151/img/avatar/" + user.avatar.filename
                return user
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
            data.data = await db.User.findAll({
                include: ["avatar",{ model: db.City, as: "city", include: ["region"] },"role","messages"],
                order: [ ["id", "DESC"]],
                limit: 3
            })
            .then((users) => {
                return users.map((user) => {
                    user.avatar.filename = "http://localhost:3151/img/avatar/" + user.avatar.filename
                    return user
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