const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({

    name: {
        type:String,
        required:[true, 'Field name is required']
    },
    subject:{
        type: String,
        required:[true, 'Field subject is required'],
    },
    email:{
        type:String,
        required:[true, 'Field email is required']
    },
    message:{
        type:String,
        required:[true, 'Field message is required'],
    }

});

const Message = mongoose.model('message', messageSchema);

module.exports = Message;