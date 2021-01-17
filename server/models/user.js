const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String, 
        required: true
    },
    createdAppts: [
        {
            type: Schema.Types.ObjectId, 
            ref: 'Appt'
        }
    ]
})


module.exports = mongoose.model('User', userSchema);