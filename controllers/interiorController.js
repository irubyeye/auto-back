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