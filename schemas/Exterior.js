const mongoose = require('mongoose');
const { Schema } = mongoose;

const Exterior = new mongoose.Schema({
	availableFor: { type: [Schema.Types.ObjectId], required: true },
	exteriorTrim: { type: [Schema.Types.ObjectId], required: true },
	wheels: { type: Schema.Types.ObjectId, required: true },
	price: { type: Number, default: 0 },
});

module.exports = mongoose.model('Exterior', Exterior);