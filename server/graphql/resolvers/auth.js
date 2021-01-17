const bcrypt = require("bcrypt");
const User = require("../../models/user");
const jwt = require("jsonwebtoken");

const secret = "shhsupersecretkeyprojectbstudios";

module.exports = {
	createUser: async (args) => {
		//find if the user exists
		try {
			const foundUser = await User.findOne({ email: args.userInput.email });
			if (foundUser) {
				throw new Error("This user has already been created.");
			}
			const hashedPassword = await bcrypt.hash(args.userInput.password, 12);

			const user = new User({
				email: args.userInput.email,
				password: hashedPassword,
			});
			const result = await user.save();
			return { ...result._doc, password: null, _id: result.id };
		} catch (err) {
			throw err;
		}
	},
	login: async ({ email, password }) => {
		const user = User.findOne({ email: email });
		if (!user) {
			throw new Error("user does not exist!");
		}
		const isEqual = await bcrypt.compare(password, user.password);
		if (!isEqual) {
			throw new Error("Password is incorrect!");
		}
		const token = jwt.sign({ userId: user.id, email: user.email }, secret, {
			expiresIn: "1h",
		});
		return { userId: user.id, token: token, tokenExpiration: 1 };
	},
};
