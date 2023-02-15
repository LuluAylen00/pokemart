// Step 7

const mercadoPago = require("mercadopago")
const credential = process.env.MP || "TEST-3645381466893064-070611-351447983b87f23645ba15f728ce6668-157889446"
// const credential = process.env.MP || "TEST-2449401199214952-070817-641cd778cb631f08a224f24bc5d7a345-377742754"
let server = process.env.SERVER || "http://localhost:3151"
const feedback = `${server}/checkout/feedback`
// const failure = `${server}/checkout/feedback`
// const pending = `${server}/checkout/feedback`

const mp  = async (items,cuotas,shipping) => {
    try {
        mercadoPago.configure({
            access_token: credential
        })
        let config = {
            items: items,
            back_urls:{
                success: feedback,
                failure: feedback,
                pending: feedback
            },
            payment_methods: {
                installments: cuotas
            },
            auto_return: "approved",
            shipments: {
                cost: shipping,
                mode: "not_specified"
            }
        }

        let preference = await mercadoPago.preferences.create(config)
        return preference
    } catch (error) {
        throw new Error(error)
    }
}
module.exports = mp
