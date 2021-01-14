const bcrypt = require('bcrypt');
const Appt = require('../../models/appt');
const User = require('../../models/user');
const Booking = require('../../models/booking');

// function to hold the mapped appointment
const convertAppt = appointment => {
    return {
        ...appointment._doc, 
        _id: appointment.id,
        date: new Date(appointment._doc.date).toISOString(),
        creator: user.bind(this, appointment._doc.creator)
    };
};

const appt = async apptIds => {   
   try {
    const appt =  await Appt.find({ _id: { $in: apptIds } });
        return appt.map(appointment => {
            return convertAppt(appointment);
        });
      
    } catch (err) {
        throw err;
    }
};  
 
const singleAppt = async apptId => {
    try{
        //get the appointment
        const appointment = await Appt.findById(apptId);
        return convertAppt(appointment);
    }
    catch (err) {
        throw err;
    }
}
const user = async userId => {
    try {
    const user = await User.findById(userId);
        return {
            ...user._doc,
             id: user.id, 
             createdAppts: appt.bind(this, user._doc.createdAppts) 
        };
    } catch (err) {
        throw err;
    }
};
 module.exports = 
 {
    appt: async () => {
        try{
        const appt = await Appt.find()
            return appt.map(appointment => {
                return convertAppt(appointment);
            });
        }catch (err) {
            throw err;
        }
    },
    bookings: async () => {
        try{
           //get all of the bookings from db
           const bookings = await Booking.find();
           return bookings.map(booking=> {
               return {
                   ...booking._doc,
                   _id: booking.id,
                   user: user.bind(this, booking._doc.user),
                   appointment: singleAppt.bind(this, booking._doc.appointment),
                   createdAt: new Date(booking._doc.createdAt).toISOString(),
                   updatedAt: new Date(booking._doc.updatedAt).toISOString()
               };
           });
        }
        catch (err) {
            throw err;
        }
    },
    //create our appointments
    createAppt: async (args) => {
        const appointment = new Appt({
           title: args.apptInput.title,
           description: args.apptInput.description,
           category: args.apptInput.category,
           price: +args.apptInput.price,
           date: new Date(args.apptInput.date),
           time: args.apptInput.time,
           creator: '5fff85e6a2c1af1ea3273646'
    });
    let createdAppts;
    try {
      const result = await appointment.save();
      createdAppts = {
        ...result._doc,
        _id: result._doc._id.toString(),
        date: new Date(appointment._doc.date).toISOString(),
        creator: user.bind(this, result._doc.creator)
      };
      const creator = await User.findById('5fff85e6a2c1af1ea3273646');

      if (!creator) {
        throw new Error('User not found.');
      }
      
      creator.createdAppts.push(appointment);
      await creator.save();

      return createdAppts;
    } catch (err) {
      throw err;
    }
  },
    createUser: async (args) => {
        //find if the user exists
        try {
            const foundUser = await User.findOne({email: args.userInput.email})
            if(foundUser) {
                throw new Error('This user has already been created.');
            }
            const hashedPassword = await bcrypt.hash(args.userInput.password, 12);

            const user = new User({
                email: args.userInput.email,
                password: hashedPassword
            });
            const result = await user.save();
            return {...result._doc, password: null, _id: result.id};
        } catch (err) {
            throw err;
        }
    },
    bookAppt: async args => {
        //get the appointment to book
        const retrievedAppt = await Appt.findOne({_id: args.apptId});
        const booking = new Booking({
            user: '5fff85e6a2c1af1ea3273646',
            appointment: retrievedAppt
        });
        const result = await booking.save();
        return {...result._doc,
           _id: result.id, 
        user: user.bind(this, booking._doc.user),
        appointment: singleAppt.bind(this, booking._doc.appointment),
        createdAt: new Date(result._doc.createdAt).toISOString(),
        updatedAt: new Date(result._doc.updatedAt).toISOString()
        };
    },
    cancelAppt: async args => {
        try{
           const booking = await Booking.findById(args.bookingId).populate('appointment'); 
           const appointment = convertAppt(booking.appointment);
            
        await Booking.deleteOne({_id: args.bookingId});
         return appointment;
        }
        catch(err) {
            throw err;
        }
    }
};