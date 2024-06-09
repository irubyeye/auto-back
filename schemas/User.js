const mongoose = require('mongoose');
const Car = require('./Car');
const { Schema } = mongoose;

const Complectation = new Schema({
	baseModel: { type: [Schema.Types.ObjectId], ref: "Car", required: true },
	name: { type: String, required: true },
	description: {
		en: { type: String, required: true },
		ua: { type: String, required: true },
	},
	maxSpeed: { type: Number, required: true },
	acceleration: { type: Number, required: true },
	engine: {
		availableFor: { type: [Schema.Types.ObjectId], ref: "Car", required: true },
		manufacturer: { type: String, required: true },
		model: { type: String, required: true },
		volume: { type: Number, required: true },
		hp: { type: Number, required: true },
		torque: { type: Number, required: true },
		turbo: { type: Boolean, required: true },
		price: { type: Number, default: 0 }
	},
	transmission: {
		availableFor: { type: [Schema.Types.ObjectId], required: true },
		type: { type: String, required: true },
		drive: { type: String, required: true },
		gears: { type: Number, required: true },
		price: { type: Number, default: 0 }
	},
	suspension: {
		availableFor: { type: [Schema.Types.ObjectId], required: true },
		type: { type: String, required: true },
		price: { type: Number, default: 0 }
	},
});

const User = new Schema({
	username: { type: String, unique: true, required: true },
	password: { type: String, required: true },
	contacts: {
		email: String,
		phone: String,
	},
	roles: { type: [String], default: ["user"] },
	orders: { type: [Schema.Types.ObjectId], ref: "Order" },
	savedComplects: { type: [Complectation], default: [] },
});

module.exports = mongoose.model('User', User);