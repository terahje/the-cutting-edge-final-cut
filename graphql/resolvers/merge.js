const Appt = require('../../models/appt');
const User = require('../../models/user');
const { dateToString } = require('../../helpers/date');

 // function to hold the mapped appointment
 const modifyAppt = appointment => {
    return {
        ...appointment._doc, 
        _id: appointment.id,
        date: dateToString(appointment._doc.date),
        creator: user.bind(this, appointment._doc.creator)
    };
};

//function to hold the mapped booking
const modifyBooking = booking => {
    return {
        ...booking._doc,
        _id: booking.id,
        user: user.bind(this, booking._doc.user),
        appointment: singleAppt.bind(this, booking._doc.appointment),
        createdAt: dateToString(booking._doc.createdAt),
        updatedAt: dateToString(booking._doc.updatedAt)
    }
};
//all appointments
const appt = async apptId => {
    try {
      const appt = await Event.find({ _id: { $in: apptId } });
      appt.map(appointment => {
        return modifyAppt(appointment);
      });
      return appt;
    } catch (err) {
      throw err;
    }
  };
  //single appointment
  const singleAppt = async apptId => {
    try{
        //get the appointment
        const appointment = await Appt.findById(apptId);
        return modifyAppt(appointment);
    }
    catch (err) {
        throw err;
    }
}
//user - can be stylist or a customer
const user = async userId => {
    try {
      const user = await User.findById(userId);
      return {
        ...user._doc,
        _id: user.id,
        createdAppt: appt.bind(this, user._doc.createdAppt)
      };
    } catch (err) {
      throw err;
    }
  };

 

exports.modifyAppt = modifyAppt;
exports.modifyBooking = modifyBooking;
//   exports.user = user;
//   exports.appt = appt;
//   exports.singleAppt = singleAppt;
