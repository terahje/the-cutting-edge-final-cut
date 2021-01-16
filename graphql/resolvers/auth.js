const bcrypt = require('bcrypt');
const User = require('../../models/user');
const jwt = require('jsonwebtoken');

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
    },

    login: async ({email, password}) => {
        const user = await User.findOne({email: email});
        if(!user) {
            throw new Error( "We could not find this user!");
        } 
        //check if entered password matches the hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            throw new Error("The entered password does not match");
        }
       const token =  jwt.sign({ userId: user.id, email: user.email}, 'thisismysecretkey', 
        {
            expiresIn: '1hr'
        } 

       );
       return {userId: user.id, token: token, tokenExpiration: 1}

    }
};