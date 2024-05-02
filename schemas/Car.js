const mongoose = require('mongoose');
const { Schema } = mongoose;


const Car = new mongoose.Schema({
	img: { type: [String], required: true },
	origin: { type: String, required: true },
	brand: { type: String, required: true },
	model: { type: String, required: true },
	body: { type: String, required: true },
	engineDisplacement: { type: String, required: true },
	modelYear: { type: Number, required: true },
	basePrice: { type: Number, required: true },
	complectations: [Schema.Types.ObjectId],
	colors: { type: [Schema.Types.ObjectId], required: true },
	optionPacks: [Schema.Types.ObjectId],
});

module.exports = mongoose.model('Car', Car);