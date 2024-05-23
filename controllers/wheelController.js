const Wheels = require('../schemas/Wheels');
const { ObjectId } = require('mongodb');

class wheelController {
	async getAvailable(req, res) {
		try {
			const data = await Wheels.aggregate([
				{
					$match: {
						availableFor: { $in: [new ObjectId(req.query.id)] }
					}
				}
			])
			return res.json(data);
		} catch (error) {
			console.log(error);
			return res.status(500).json(error);
		}
	}

	async add(req, res) {
		try {
			delete req.body._id;
			const newWheel = await Wheels.create(req.body);
			return res.json(newWheel);
		} catch (error) {
			console.log(error);
			return res.status(500).json(error);
		}
	}

	async update(req, res) {
		try {
			const { availableFor, manufacturer, model, type, diameter, colors, price } = req.body;
			const updateDocument = {
				$set: {
					availableFor,
					manufacturer,
					model,
					type,
					diameter,
					colors,
					price
				},
			};
			// update if _id match or upsert & return new
			const result = await Wheels.findOneAndUpdate({ _id: new ObjectId(req.body._id) }, updateDocument, { upsert: true, new: true });
			return res.json(result);
		} catch (error) {
			console.log(error);
			return res.status(500).json(error);
		}
	}
}

module.exports = new wheelController();