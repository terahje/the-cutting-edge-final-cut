const Appt = require('../../models/appt');
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
    createAppt: async (args) => {
        const appointment = new Appt({
           title: args.apptInput.title,
           description: args.apptInput.description,
           category: args.apptInput.category,
           price: +args.apptInput.price,
           date: new Date(args.apptInput.date),
           time: args.apptInput.time,
           creator: '6001a9f6850d32286e2cdac3'
    });
    let createdAppts;
    try {
      const result = await appointment.save();
      createdAppts = modifyAppt(result);
      const creator = await User.findById('600252720b5d8809c9de61a4');

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