const db = require('../database/models')
const { validationResult } = require('express-validator')
const {hashSync} = require('bcryptjs')

module.exports = {
    // Controladores nuevos (Sprint 3 en adelante)
    register: async (req, res) => {
        let data = {
            style: "access",
            title: "Ingreso"
        };
        try {
            data.cities = await db.City.findAll();
            data.regions = await db.Region.findAll();
            data.avatars = await db.Avatar.findAll();
        } catch (error) {
            console.log(error);
        }
        
        return res.render("users/access", {data, errors: null}); // Renderizo el ejs (res.render) de mi login/registro para que se vea en el navegador
    },
    connect: async (req, res) => {
        const result = validationResult(req);
        if(!result.isEmpty()){
            let errores = result.mapped();
            console.log(errores);
            let data = {
                style: "access",
                title: "Ingreso"
            };
            try {
                data.cities = await db.City.findAll();
                data.regions = await db.Region.findAll();
                data.avatars = await db.Avatar.findAll();
            } catch (error) {
                console.log(error);
            }
            return res.render('users/access',{
                style: "access",
                title: "Ingreso",
                errors: {login:{
                    fields: errores,
                    values: req.body
                }},
                data
            })
        }
        if (req.body.remember){
            res.cookie('trainer', req.body.email,{maxAge: 1000 * 60 * 60 * 24})
        }
        try {
            req.session.user = await db.User.findOne({where: { email: req.body.email }}).catch(error => res.send(error))
        } catch (error) {
            console.log(error);
        }

        return res.redirect('/')
    },
    save: async (req, res) => {
        const result = validationResult(req);
        if(!result.isEmpty()){
            let errores = result.mapped();
            console.log(errores);
            let data = {
                style: "access",
                title: "Ingreso"
            };
            try {
                data.cities = await db.City.findAll();
                data.regions = await db.Region.findAll();
                data.avatars = await db.Avatar.findAll();
            } catch (error) {
                console.log(error);
            }
            return res.render('users/access',{
                style: "access",
                title: "Ingreso",
                errors: {register:{
                    fields: errores,
                    values: req.body
                }},
                data
            })
        }

        let date = new Date();
        let registerData = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;

        let body = {
            username: req.body.username,
            email: req.body.email,
            password: hashSync(req.body.password, 10),
            avatarId: parseInt(req.body.avatar),
            cityId: parseInt(req.body.city),
            money: 0,
            usertypeId: req.body.email.includes("@pokemart") ? 2 : 1
        };
        db.User.create(body);
        return res.redirect("/access")
    },
    all: async (req, res) => {
        let data = {
            style: "userlist",
            title: "Listado de usuarios",
        };
        try {
            data.trainer = await db.User.findByPk(req.params.id, { include: ["avatar", { model: db.City, as: "city", include: ["region"] }]});
            data.cities = await db.City.findAll();
            data.regions = await db.Region.findAll();
        } catch (error) {
            console.log(error);
        }

        return res.render("users/list", {data});
    },
    profile: async (req, res) => {
        let data = {
            style: "profile",
            title: "Tarjeta de entrenador",
        };

        let infoASacar = []
        for (let i = 0; i < 107; i++) {
            const element = '("trainer'+i+'.png")';
            infoASacar.push(element);
        }
        console.log(infoASacar.toString());

        try {
            data.trainer = await db.User.findByPk(res.locals.user.id, { include: ["avatar", { model: db.City, as: "city", include: ["region"] }]});
            data.cities = await db.City.findAll();
            data.regions = await db.Region.findAll();
            data.avatars = await db.Avatar.findAll();
        } catch (error) {
            console.log(error);
        }

        return res.render("users/detail", {data});
    },
    updateUsername: async (req, res) => {
        try {
            await db.User.update({username: req.body.username},{where: {id: req.params.id}})
        } catch (error) {
            console.log(error);
        }
        return res.redirect('/profile/')
    },
    updateCity: async (req, res) => {
        try {
            await db.User.update({cityId: parseInt(req.body.city)},{where: {id: req.params.id}})
        } catch (error) {
            console.log(error);
        }
        return res.redirect('/profile/')
    },
    updateAvatar: async (req, res) => {
        try {
            await db.User.update({avatarId: parseInt(req.body.avatar)},{where: {id: req.body.id}})
        } catch (error) {
            console.log(error);
        }
        return res.redirect('/profile/')
    },
    erase: async (req, res) => {
        try {
            await db.User.destroy({where: {id: req.params.id}})
        } catch (error) {
            console.log(error);
        }

        return res.redirect('/')
    },
    logout: (req, res) => {
        delete req.session.user;
        res.cookie('trainer', null,{maxAge: -1});
        return res.redirect('/');
    }
};