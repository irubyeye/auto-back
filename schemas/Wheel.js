const mongoose = require('mongoose');
const { Schema } = mongoose;

const Wheel = new mongoose.Schema({
	availableFor: { type: [Schema.Types.ObjectId], required: true },
	name: { type: String, required: true },
	diameter: { type: Number, required: true }, //milimeter
});

module.exports = mongoose.model('Wheel', Wheel);