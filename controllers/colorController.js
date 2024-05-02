const Color = require('../schemas/Color.js');
const { ObjectId } = require('mongodb');

class colorController {
	async getAvailable(req, res) {
		try {
			const data = await Color.aggregate([
				{
					$match: {
						availableFor: { $in: [new ObjectId(req.query.id)] }
					}
				}
			])
			return res.json(data);
		} catch (error) {
			return res.status(500).json(error);
		}
	}

	async add(req, res) {
		try {
			const color = await Color.create(req.body);
			return res.json([color]);
			// res.set('Access-Control-Allow-Origin', process.env.FrontURL);
		} catch (error) {
			return res.status(500).json(error);
		}
	}
}

module.exports = new colorController();