const mongoose = require('mongoose');
const { Schema } = mongoose;
const Car = require("./Car");

const ExteriorItem = new mongoose.Schema({
	availableFor: { type: [Schema.Types.ObjectId], ref: "Car", required: true },
	/* trim/seatings/feature */
	type: { type: String, required: true },
	value: {
		en: { type: String, required: true },
		ua: { type: String, required: true }
	},
	price: { type: Number, required: true },
});

module.exports = mongoose.model('ExteriorItem', ExteriorItem);