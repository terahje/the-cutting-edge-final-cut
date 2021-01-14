const bcrypt = require('bcrypt');
const Appt = require('../../models/appt');
const User = require('../../models/user');

const appt = async apptIds => {
   
   try {
    const appt =  await Appt.find({ _id: { $in: apptIds } });
        appt.map(appointment => {
            return { 
                ...appointment._doc, 
                _id: appointment.id, 
                date: new Date(appointment._doc.date).toISOString(),
                creator:  user.bind(this, appointment.creator)
            };
        });
      return appt;
    } catch (err) {
        throw err;
    }
};  
   
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
                return {
                    ...appointment._doc, 
                    _id: appointment.id,
                    date: new Date(appointment._doc.date).toISOString(),
                    creator: user.bind(this, appointment._doc.creator)
                };
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
    }   
}