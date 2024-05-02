const mongoose = require('mongoose');
const { Schema } = mongoose;

const Interior = new mongoose.Schema({
	availableFor: { type: [Schema.Types.ObjectId], required: true },
	// seating: { type: Schema.Types.ObjectId, required: true },
	interiorTrim: { type: [Schema.Types.ObjectId], required: true },
	colors: { type: [Schema.Types.ObjectId], required: true },
	price: { type: Number, default: 0 },
});

module.exports = mongoose.model('Interior', Interior);