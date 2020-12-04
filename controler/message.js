
const Message = require('../models/message');


// Creating a message to the database
const createMessage = async (req, res) => {
    try {
        const message = await Message.create(req.body);
        res.send({sent: "your query is sent", message: message});
    } catch (error) {
        res.status(500). send({error: error.message})
    }
}
// getting all the messages from the database
const getMessages = async (req, res) => {
    try {
        const messages = await Message.find({});
        res.status(200).json(messages)
    } catch (error) {
        res.status(400).json({message:error.message})
    }

}
// retrieving a particular message from the database.
const getMessage = async (req, res) => {
    try {
        const message = await Message.findById({_id: req.params.id})
        res.send(message)
    } catch (error) {
        res.status(400).json({message:error.message})
    }

}
// Delete message from the database

const deleteMessage = async (req, res) => {
    try {
        await Message.findByIdAndDelete({_id: req.params.id});
        res.status(200).send("Message deleted successfully")
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}

module.exports = {
    createMessage,
    getMessages,
    getMessage,
    deleteMessage
}
