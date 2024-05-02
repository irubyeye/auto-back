const mongoose = require('mongoose');
const { Schema } = mongoose;

const Suspension = new mongoose.Schema({
	availableFor: { type: [Schema.Types.ObjectId], required: true },
	type: { type: String, required: true },
});

module.exports = mongoose.model('Suspension', Suspension);