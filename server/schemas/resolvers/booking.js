const { Booking, Appt } = require('../../models');
const { modifyBooking, modifyAppt } = require('./merge');


const bookingResolver = {
    Query: {
    bookings: async (args, req) => {
        if (!req.isAuth) {
            throw new Error('Please sign in!');
          }
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
    }
},
    Mutation: {
    bookAppt: async (args, req) => {
        if (!req.isAuth) {
            throw new Error('Please sign in!');
          }
        //get the appointment to book
        const retrievedAppt = await Appt.findOne({_id: args.apptId});
        const booking = new Booking({
            user: req.userId,
            appointment: retrievedAppt
        });
        const result = await booking.save();
        return modifyBooking(result);
    },
    cancelAppt: async (args, req) => {
        if (!req.isAuth) {
            throw new Error('Please sign in!');
          }
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
}
};


module.exports = bookingResolver;