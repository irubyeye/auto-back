const mongoose = require('mongoose');

const Order = new mongoose.Schema({
	client: { type: String, required: true },
	order: {},
});

//Model.index({ title: 'text' }, { default_language: "russian" });

module.exports = mongoose.model('Order', Order);