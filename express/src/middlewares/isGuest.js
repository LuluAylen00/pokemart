const db = require('../database/models');

let middleware = async (req,res,next) => {
    
    if(!res.locals.user){
        return res.redirect('/access');
    }

    return next();
}

module.exports = middleware;