const db = require('../database/models');
const { body } = require('express-validator');

const validator = [
    body("name")
        .notEmpty().withMessage("Debes completar el Nombre del producto").bail()
        .isLength({ min: 3 }).withMessage("El nombre debe tener mas de 3 caracteres")
    ,
    body("description")
        .notEmpty().withMessage("Debes completar la Descripción del producto").bail()
        .isLength({ min: 10 }).withMessage("La descripción debe tener mas de 10 caracteres")
    ,
    body("price")
        .notEmpty().withMessage("Debes completar el Precio del producto").bail()
        .isNumeric().withMessage("El precio solo debe contener números")
    ,
    body("category")
        .isLength({ min: 1 }).withMessage("Debes seleccionar la Categoría del producto").bail()
    ,
    body("gen")
        .isLength({ min: 1 }).withMessage("Debes seleccionar la Generación del producto").bail()
    ,
    body("image")
        .custom((value, {req}) => {
            if (req.file){
                if (!req.file.mimetype.includes("image")) {
                    throw new Error("Debes seleccionar un archivo de tipo imagen")
                } else if (!req.file.mimetype.includes("png")) {
                    throw new Error("Debes seleccionar una imagen de formato PNG")
                } else {
                    return true
                }
            } else {
                throw new Error("Debes seleccionar la Imagen del producto")
            }
        })
    ,
];

module.exports = validator;