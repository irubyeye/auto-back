const mongoose = require('mongoose');

const Accessories = new mongoose.Schema({
	img: { type: String, required: true },
	value: {
		en: { type: String, required: true },
		ua: { type: String, required: true }
	},
	price: { type: Number, required: true },
});

module.exports = mongoose.model('Accessories', Accessories);