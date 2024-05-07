const mongoose = require('mongoose');
const { Schema } = mongoose;

const optionPacks = new mongoose.Schema({
	availableFor: { type: [Schema.Types.ObjectId], required: true },
	name: { type: String, required: true },
	features: { type: [Schema.Types.ObjectId], required: true },
	price: { type: Number, default: 0 },
});

module.exports = mongoose.model('optionPacks', optionPacks);