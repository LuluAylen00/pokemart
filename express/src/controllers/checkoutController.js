const mp = require('../modules/mercadoPago');
const db = require('../database/models');

module.exports = {
    // Step 8
    process: async (req,res) => {
        let data = JSON.parse(req.body.order);
        try {
            let items = data.map(item => Object({...item, currency_id:"ARS", unit_price: item.price}))
            let link = await mp(items,12,0)
            return res.redirect(link.body.init_point)
        } catch (error) {
            return res.send(error)
        }
    },
    // Step 9
    feedback: async (req, res) => {
        let data = JSON.parse(req.body.order);
        return res.send(req.query)
    }
};