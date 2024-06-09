const Accessories = require('../schemas/Accessories');
const { ObjectId } = require('mongodb');

class accessoriesController {
	async get(req, res) {
		try {
			const options = {
				skip: req.query.skip || 0,
				limit: req.query.limit || 0
			}
			const accessories = await Accessories.find({}, options);
			return res.json(accessories);
		} catch (error) {
			console.log(error);
			return res.status(500).json(error);
		}
	}

	async add(req, res) {
		try {
			delete req.body._id;
			const newAccessorie = await Accessories.create(req.body);
			return res.json(newAccessorie);
		} catch (error) {
			console.log(error);
			return res.status(500).json(error);
		}
	}

	async update(req, res) {
		try {
			const { img, value, price } = req.body;
			const updateDocument = {
				$set: {
					img,
					value,
					price,
				},
			};
			// update if _id match or upsert & return new
			const result = await Accessories.findOneAndUpdate({ _id: new ObjectId(req.body._id) }, updateDocument, { upsert: true, new: true });
			return res.json(result);
		} catch (error) {
			console.log(error);
			return res.status(500).json(error);
		}
	}

	async delete(req, res) {
		try {
			const result = await Accessories.deleteOne({ _id: new ObjectId(req.body.id) });
			return res.json(result);
		} catch (error) {
			return res.status(500).json(error);
		}
	}
}

module.exports = new accessoriesController();