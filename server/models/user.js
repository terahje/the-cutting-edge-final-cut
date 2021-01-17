const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema({
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	createdAppts: [
		{
			type: Schema.Types.ObjectId,
			ref: "Appt",
		},
	],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
