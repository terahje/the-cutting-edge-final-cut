const Appt = require('../../models/appt');
const User = require('../../models/user');
const { modifyAppt } = require('./merge');

module.exports = 
 {
    appt: async () => {
        try{
        const appt = await Appt.find()
            return appt.map(appointment => {
                return modifyAppt(appointment);
            });
        }catch (err) {
            throw err;
        }
    },
    
    //create our appointments
    createAppt: async (args, req) => {
      if (!req.isAuth) {
        throw new Error('Please sign in!');
      }
        const appointment = new Appt({
           title: args.apptInput.title,
           description: args.apptInput.description,
           category: args.apptInput.category,
           price: +args.apptInput.price,
           date: new Date(args.apptInput.date),
           time: args.apptInput.time,
           creator: req.userId
    });
    let createdAppts;
    try {
      const result = await appointment.save();
      createdAppts = modifyAppt(result);
      const creator = await User.findById(req.userId);

      if (!creator) {
        throw new Error('User not found.');
      }
      
      creator.createdAppts.push(appointment);
      await creator.save();

      return createdAppts;
    } catch (err) {
      throw err;
    }
  }
   

};