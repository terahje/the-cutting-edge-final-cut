const mongoose = require('mongoose');
const { Schema } = mongoose;

const bookingSchema = new Schema({
    appointment: {
        type: Schema.Types.ObjectId,
        ref: 'Appt'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
},
{
    timestamps: true
}
);

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;

