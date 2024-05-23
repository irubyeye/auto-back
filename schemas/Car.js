const mongoose = require('mongoose');
const { Schema } = mongoose;
const Complectation = require('./Complectation');
const InteriorItem = require('./InteriorItem');
const ExteriorItem = require('./ExteriorItem');
const Wheels = require('./Wheels');

const IMG = new Schema({
	color: { type: String, required: true },
	srcset: { type: [String], required: true }
});

const Interior = new Schema({
	trim: { type: Schema.Types.ObjectId, ref: "InteriorItem", required: true },
	seatings: { type: Schema.Types.ObjectId, ref: "InteriorItem", required: true },
	features: { type: [Schema.Types.ObjectId], ref: "InteriorItem" },
});

const Exterior = new Schema({
	bumpers: { type: Schema.Types.ObjectId, ref: "ExteriorItem", required: true },
	spoiler: { type: Schema.Types.ObjectId, ref: "ExteriorItem", required: true },
	wheels: { type: Schema.Types.ObjectId, ref: "Wheels", required: true },
	features: { type: [Schema.Types.ObjectId], ref: "ExteriorItem" },
});

const Car = new mongoose.Schema({
	img: { type: [IMG], required: true },
	brand: { type: String, required: true },
	model: { type: String, required: true },
	body: { type: String, required: true },
	engineDisplacement: { type: String, required: true },
	modelYear: { type: Number, required: true },
	basePrice: { type: Number, required: true },
	interior: Interior,
	exterior: Exterior,
	complectations: { type: [Schema.Types.ObjectId], ref: "Complectation" },
});

module.exports = mongoose.model('Car', Car);