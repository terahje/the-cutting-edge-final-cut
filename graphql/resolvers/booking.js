const Booking = require('../../models/booking');
const Appt = require('../../models/appt');
const { modifyBooking, modifyAppt } = require('./merge');


module.exports = 
 {
    
    bookings: async () => {
        try{
           //get all of the bookings from db
           const bookings = await Booking.find();
           return bookings.map(booking => {
               return modifyBooking(booking);  
           });
          
        }
        catch (err) {
            throw err;
        }
    },
    
    bookAppt: async args => {
        //get the appointment to book
        const retrievedAppt = await Appt.findOne({_id: args.apptId});
        const booking = new Booking({
            user: '600252720b5d8809c9de61a4',
            appointment: retrievedAppt
        });
        const result = await booking.save();
        return modifyBooking(result);
    },
    cancelAppt: async args => {
        try{
           const booking = await Booking.findById(args.bookingId).populate('appointment'); 
           const appointment = modifyAppt(booking.appointment);
            
        await Booking.deleteOne({_id: args.bookingId});
         return appointment;
        }
        catch(err) {
            throw err;
        }
    }
};