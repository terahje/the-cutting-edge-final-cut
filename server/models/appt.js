const mongoose = require('mongoose');

const { Schema } = mongoose;

const apptSchema = new Schema({
        title: {
            type: String,
            required: true
        },
        description:  {
            type: String,
            required: true
        },
        category:  {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        }, 
        date: {
            type: Date,
            required: true
        },
        time: {
            type: String,
            required: true
        },
        creator: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
});

const Appt = mongoose.model('Appt', apptSchema);

module.exports = Appt;