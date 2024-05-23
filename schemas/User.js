const mongoose = require('mongoose');
const { Schema } = mongoose;

const User = new Schema({
	username: { type: String, unique: true, required: true },
	password: { type: String, required: true },
	roles: { type: [String], default: ["user"] },
	orders: [{ type: [Schema.Types.ObjectId], ref: "Order" }]
});

module.exports = mongoose.model('User', User);