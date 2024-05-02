const mongoose = require('mongoose');

const Accessories = new mongoose.Schema({
	type: { type: String, required: true },
	description: {
		en: { type: String, required: true },
		ua: { type: String, required: true }
	},
	quantity: { type: Number, required: true },
	price: { type: Number, required: true },
});

module.exports = mongoose.model('Accessories', Accessories);