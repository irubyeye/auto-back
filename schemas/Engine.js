const mongoose = require('mongoose');
const { Schema } = mongoose;

const Engine = new mongoose.Schema({
	availableFor: { type: [Schema.Types.ObjectId], required: true },
	manufacturer: { type: String, required: true },
	model: { type: String, required: true },
	volume: { type: Number, required: true },
	hp: { type: Number, required: true },
	torque: { type: Number, required: true },
	turbo: { type: Boolean, required: true },
});

module.exports = mongoose.model('Engine', Engine);