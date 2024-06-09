const InteriorItem = require('../schemas/InteriorItem.js');
const { ObjectId } = require('mongodb');

class interiorsController {
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
			const newItem = await InteriorItem.create(req.body);
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
					colors: req.body.colors,
					price: +req.body.price
				},
			};
			// update if _id match or upsert & return new
			const result = await InteriorItem.findOneAndUpdate({ _id: new ObjectId(req.body._id) }, updateDocument, { upsert: true, new: true });
			return res.json(result);
		} catch (error) {
			return res.status(500).json(error);
		}
	}

	async delete(req, res) {
		try {
			const result = await InteriorItem.deleteOne({ _id: new ObjectId(req.body) });
			return res.json(result);
		} catch (error) {
			return res.status(500).json(error);
		}
	}

	async getAvailable(req, res) {
		try {
			const data = await InteriorItem.aggregate([
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

module.exports = new interiorsController();