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

		} catch (error) {
			return res.status(500).json(error);
		}
	}

	async delete(req, res) {
		try {
			return res.json(['a?'])
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