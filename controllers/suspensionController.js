const Suspension = require('../schemas/Suspension.js');
const { ObjectId } = require('mongodb');

class suspensionController {
	async getAvailable(req, res) {
		try {
			const data = await Suspension.aggregate([
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
			const color = await Suspension.create(req.body);
			return res.json([color]);
			// res.set('Access-Control-Allow-Origin', process.env.FrontURL);
		} catch (error) {
			return res.status(500).json(error);
		}
	}
}

module.exports = new suspensionController();