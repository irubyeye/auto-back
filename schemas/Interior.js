const mongoose = require('mongoose');
const { Schema } = mongoose;
const Car = require("./Car");
const InteriorItem = require('./InteriorItem');

const Interior = new mongoose.Schema({
	availableFor: { type: [Schema.Types.ObjectId], ref: Car, required: true },
	/* interiorItem: {type: trim/seatings/features} */
	trim: { type: Schema.Types.ObjectId, ref: "InteriorItem", required: true },
	seatings: { type: Schema.Types.ObjectId, ref: "InteriorItem", required: true },
	features: { type: Schema.Types.ObjectId, ref: "InteriorItem", required: true },
});

module.exports = mongoose.model('Interior', Interior);