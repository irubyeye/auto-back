const mongoose = require('mongoose');
const { Schema } = mongoose;

const Color = new mongoose.Schema({
	availableFor: { type: [Schema.Types.ObjectId], required: true },
	name: { type: String, required: true },
});

module.exports = mongoose.model('Color', Color);