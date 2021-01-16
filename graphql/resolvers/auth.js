const bcrypt = require('bcrypt');
const User = require('../../models/user');

 module.exports = 
 {
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
            return { ...result._doc, password: null, _id: result.id };
        } catch (err) {
            throw err;
        }
    }
};