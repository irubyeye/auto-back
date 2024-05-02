const mongoose = require('mongoose');
const { Schema } = mongoose;

const Feature = new mongoose.Schema({
	availableFor: { type: [Schema.Types.ObjectId], required: true },
	// complectations-interior-seating | complectations-ext-trim | complectations-transmission-drive | complectations-engine-turbo
	path: { type: String, required: true },
	value: {
		en: { type: String, required: true },
		ua: { type: String, required: true },
	},
	price: { type: Number, required: true },
});

module.exports = mongoose.model('Feature', Feature);