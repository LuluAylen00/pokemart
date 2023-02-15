const db = require('../database/models');

let middleware = async (req,res,next) => {
    let user = null ;

    if(req.cookies && req.cookies.trainer){
        try {
            user = await db.User.findOne({where: {email: req.cookies.trainer}, include: ["avatar"]});
        } catch (error) {
            console.log(error);
        };
        req.session.user = user;
    };

    if(req.session && req.session.user){
        user = req.session.user;
    };

    res.locals.user = user;

    return next();
}

module.exports = middleware;