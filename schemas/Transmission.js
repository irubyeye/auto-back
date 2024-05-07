const mongoose = require('mongoose');
const { Schema } = mongoose;

const Transmission = new mongoose.Schema({
	availableFor: { type: [Schema.Types.ObjectId], required: true },
	type: { type: String, required: true },
	drive: { type: String, required: true },
	gears: { type: Number, required: true },
});

module.exports = mongoose.model('Transmission', Transmission);