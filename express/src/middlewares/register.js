const db = require('../database/models');
const { body } = require('express-validator');
const { compareSync } = require('bcryptjs');

const validator = [
    body("username")
    ,
    body("email")
        .notEmpty().withMessage("El email debe completarse").bail()
        .isEmail().withMessage("El email debe tener un formato válido").bail()
        .custom(async (value, {req}) => {
            let data
            try {
                data = await db.User.findOne({where: {email: value}});
            } catch (error) {
                return console.log(error);
            }
            if (!data) {
                return true
            } else {
                throw new Error ("Este email ya existe en la base de datos")
            }
        })
    ,
    body("emailConf")
        .custom((value, {req}) => {
            if (value == req.body.email) {
                return true
            } else {
                throw new Error ("Las direcciones de correo no coinciden")
            }
        })
    ,
    body("password")
        .notEmpty().withMessage("La contraseña debe completarse").bail()
    ,
    body("passwordConf")
        .custom((value, {req}) => {
            if (value == req.body.password) {
                return true
            } else {
                throw new Error ("Las contraseñas no coinciden")
            }
        })
    ,
    body("region")
        .isLength({ min: 1 }).withMessage("Debes seleccionar una región")
    ,
    body("city")
        .isLength({ min: 1 }).withMessage("Debes seleccionar una ciudad")
    ,
    body("avatar")
        .isLength({ min: 1 }).withMessage("Debes seleccionar un avatar")
];

module.exports = validator;