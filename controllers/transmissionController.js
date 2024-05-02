const Transmission = require('../schemas/Transmission.js');
const { ObjectId } = require('mongodb');

class transmissionController {
	async getAvailable(req, res) {
		try {
			const data = await Transmission.aggregate([
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
			const transmission = await Transmission.create(req.body);
			return res.json([transmission]);
			// res.set('Access-Control-Allow-Origin', process.env.FrontURL);
		} catch (error) {
			return res.status(500).json(error);
		}
	}
}

module.exports = new transmissionController();