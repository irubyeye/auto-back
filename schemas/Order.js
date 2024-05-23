const mongoose = require('mongoose');
const { Schema } = mongoose;

const Order = new mongoose.Schema({
	client: { type: Schema.Types.ObjectId, ref: "User", required: true },
	car: { type: Schema.Types.ObjectId, ref: "Car" },
	status: { type: String, default: "created" }
});

module.exports = mongoose.model('Order', Order);