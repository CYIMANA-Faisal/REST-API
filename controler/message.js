
const Message = require('../models/message');


// Creating a message to the database
const createMessage = async (req, res) => {
    try {
        const message = await Message.create(req.body);
        res.send(message);
    } catch (error) {
        res.status(500). send(error)
    }
}
// getting all the messages from the database
const getMessages = async (req, res) => {
    try {
        const messages = await Message.find({});
        res.send(messages)
    } catch (error) {
        res.status(500). send(error)
    }

}
// retrieving a particular message from the database.
const getMessage = async (req, res) => {
    try {
        const message = await Message.findById({_id: req.params.id})
        res.send(message)
    } catch (error) {
        res.status(500). send(error)
    }

}
// Delete message from the database

const deleteMessage = async (req, res) => {
    try {
        const message = await Message.findByIdAndDelete({_id: req.params.id});
        if (!message) {
            res.status(404).send("No message found")
        }else{
            res.status(200).send("Message deleted successfully")
        }
    } catch (error) {
        
    }
}

module.exports = {
    createMessage,
    getMessages,
    getMessage,
    deleteMessage
}
