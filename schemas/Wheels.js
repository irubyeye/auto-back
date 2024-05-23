const mongoose = require('mongoose');
const { Schema } = mongoose;

const Wheels = new mongoose.Schema({
	availableFor: { type: [Schema.Types.ObjectId], required: true },
	manufacturer: { type: String, required: true },
	model: { type: String, required: true },
	type: { type: String, required: true },
	diameter: { type: Number, required: true }, //milimeter
	colors: { type: [String], required: true },
	price: { type: Number, required: true },
});

module.exports = mongoose.model('Wheels', Wheels);