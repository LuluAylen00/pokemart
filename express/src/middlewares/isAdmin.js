const db = require('../database/models');

let middleware = async (req,res,next) => {
    
    if(!res.locals.user || !res.locals.user.usertypeId > 1){
        return res.redirect('/');
    }

    return next();
}

module.exports = middleware;