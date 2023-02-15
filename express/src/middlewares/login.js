const db = require('../database/models');
const { body } = require('express-validator');
const { compareSync } = require('bcryptjs');

const validator = [
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
            if (data) {
                return true
            } else {
                throw new Error ("El email no existe en la base de datos")
            }
        }).withMessage("El email no existe en la base de datos")
    ,
    body("password")
        .notEmpty().withMessage("La contraseña debe completarse").bail()
        .custom(async (value, {req}) => {
            let data
            try {
                data = await db.User.findOne({where: {email: req.body.email}});
            } catch (error) {
                return console.log(error);
            }
            if (data && compareSync(value, data.password)) {
                return true
            } else {
                throw new Error ("Las credenciales no coinciden")
            }
        }).withMessage("Las credenciales no coinciden")
];

module.exports = validator;