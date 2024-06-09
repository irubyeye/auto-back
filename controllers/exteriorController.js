const ExteriorItem = require('../schemas/ExteriorItem.js');
const { ObjectId } = require('mongodb');

class exteriorsController {
	async get(req, res) {
		try {
			return res.json(['OK!!']);
		} catch (error) {
			return res.status(500).json(error);
		}
	}

	async add(req, res) {
		try {
			delete req.body._id;
			const newItem = await ExteriorItem.create(req.body);
			return res.json(newItem);
		} catch (error) {
			return res.status(500).json(error);
		}
	}

	async update(req, res) {
		try {
			const updateDocument = {
				$set: {
					availableFor: req.body.availableFor,
					type: req.body.type,
					value: req.body.value,
					price: +req.body.price
				},
			};
			// update if _id match or upsert & return new
			const result = await ExteriorItem.findOneAndUpdate({ _id: new ObjectId(req.body._id) }, updateDocument, { upsert: true, new: true });
			return res.json(result);
		} catch (error) {
			return res.status(500).json(error);
		}
	}

	async delete(req, res) {
		try {
			const result = await ExteriorItem.deleteOne({ _id: new ObjectId(req.body) });
			return res.json(result);
		} catch (error) {
			return res.status(500).json(error);
		}
	}

	async getAvailable(req, res) {
		try {
			const data = await ExteriorItem.aggregate([
				{
					$match: {
						availableFor: { $in: [new ObjectId(req.query.id)] }
					}
				},
			])
			return res.json(data);
		} catch (error) {
			console.log(error);
			return res.status(500).json(error);
		}
	}
}

module.exports = new exteriorsController();