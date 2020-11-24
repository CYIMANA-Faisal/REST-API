const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({

    name: {
        type:String,
        require:true
    },
    subject:{
        type: String,
        require:true,
    },
    email:{
        type:String,
        require:true
    },
    message:{
        type:String,
        require:true,
    }

});

const Message = mongoose.model('message', messageSchema);

module.exports = Message;