const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(
	`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.m2yyl.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFindAndModify: false,
	}
);

module.exports = mongoose.connection;
