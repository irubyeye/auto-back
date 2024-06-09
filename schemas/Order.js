const mongoose = require('mongoose');
const User = require('./User');
const InteriorItem = require('./InteriorItem');
const ExteriorItem = require('./ExteriorItem');
const Wheels = require('./Wheels');
const Accessories = require('./Accessories');
const { Schema } = mongoose;

const Order = new mongoose.Schema({
	client: { type: Schema.Types.ObjectId, ref: "User", required: true },
	car: {
		_id: { type: Schema.Types.ObjectId, required: true },
		img: {
			color: {
				en: { type: String, required: true },
				ua: { type: String, required: true },
			},
			srcset: { type: [String], required: true }
		},
		brand: { type: String, required: true },
		model: { type: String, required: true },
		body: { type: String, required: true },
		engineDisplacement: { type: String, required: true },
		modelYear: { type: Number, required: true },
		basePrice: { type: Number, required: true },
		interior: {
			trim: { type: Schema.Types.ObjectId, ref: "InteriorItem", required: true },
			seatings: { type: Schema.Types.ObjectId, ref: "InteriorItem", required: true },
			features: { type: [Schema.Types.ObjectId], ref: "InteriorItem" },
		},
		exterior: {
			bumpers: { type: Schema.Types.ObjectId, ref: "ExteriorItem", required: true },
			spoiler: { type: Schema.Types.ObjectId, ref: "ExteriorItem", required: true },
			wheels: { type: Schema.Types.ObjectId, ref: "Wheels", required: true },
			features: { type: [Schema.Types.ObjectId], ref: "ExteriorItem" },
		},
		complectation: {
			name: { type: String, required: true },
			description: {
				en: { type: String, required: true },
				ua: { type: String, required: true },
			},
			maxSpeed: { type: Number, required: true },
			acceleration: { type: Number, required: true },
			engine: { type: Schema.Types.ObjectId, required: true },
			engineIsTurbo: { type: Boolean, required: true },
			transmission: { type: Schema.Types.ObjectId, required: true },
			suspension: { type: Schema.Types.ObjectId, required: true },
		},
		appearanceColors: {
			trim: { type: String, required: true },
			seatings: { type: String, required: true },
			wheels: { type: String, required: true },
		}
	},
	accessories: { type: [], ref: 'Accessories', default: [] },
	totalPrice: { type: Number, required: true },
	status: { type: String, default: "created" }
});

module.exports = mongoose.model('Order', Order);