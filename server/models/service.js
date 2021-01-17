const mongoose = require("mongoose");

const { Schema } = mongoose;

const serviceSchema = new Schema({
	//table definitions
	name: {
		type: String,
		required: true,
		trim: true,
	},
	category: {
		type: String,
		required: true,
	},
	style: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	price: {
		type: String,
		required: true,
	},
	time_alloted: {
		type: String,
	},
	user_id: {
		type: Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
});

const Service = mongoose.model("Service", serviceSchema);

module.exports = Service;
