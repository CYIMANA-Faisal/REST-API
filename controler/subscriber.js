const Subscriber = require('../models/subscriber');

const subscribe = async (req, res) => {
    try {
        const subscribe = await Subscriber.create(req.body)
        if (!subscribe) {
            res.status(404).send("Failed to subscribe")
        } else {
            res.status(200).send("Thank you for subscribing to our news letter.")
        }
    } catch (error) {
        
    }
}

module.exports = subscribe