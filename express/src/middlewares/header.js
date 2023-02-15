const db = require('../database/models');

let middleware = async (req,res,next) => {
    let categories
    try {
        categories = await db.Category.findAll();
    } catch (error) {
        console.log(error);
    };

    res.locals.categories = categories;

    return next();
}

module.exports = middleware;