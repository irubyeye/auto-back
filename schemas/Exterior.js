const mongoose = require('mongoose');
const { Schema } = mongoose;

const Exterior = new mongoose.Schema({
	availableFor: { type: [Schema.Types.ObjectId], required: true },
	bumpers: {},
	spoiler: {},
	features: {},
	wheels: { type: Schema.Types.ObjectId, required: true },
});

module.exports = mongoose.model('Exterior', Exterior);