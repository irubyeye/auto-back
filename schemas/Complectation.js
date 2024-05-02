const mongoose = require('mongoose');
const { Schema } = mongoose;

const Complectation = new mongoose.Schema({
	baseModel: { type: [Schema.Types.ObjectId], required: true },
	name: { type: String, required: true },
	description: {
		en: { type: String, required: true },
		ua: { type: String, required: true },
	},
	maxSpeed: { type: Number, required: true },
	acceleration: { type: Number, required: true },
	engine: { type: Schema.Types.ObjectId, required: true },
	transmission: { type: Schema.Types.ObjectId, required: true },
	suspension: { type: Schema.Types.ObjectId, required: true },
});

module.exports = mongoose.model('Complectation', Complectation);