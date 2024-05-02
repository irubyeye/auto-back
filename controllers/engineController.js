const Engine = require('../schemas/Engine.js');
const { ObjectId } = require('mongodb');

class engineController {
	async getAvailable(req, res) {
		try {
			const data = await Engine.aggregate([
				{
					$match: {
						availableFor: { $in: [new ObjectId(req.query.id)] }
					}
				}
			]);
			return res.json(data);
		} catch (error) {
			return res.status(500).json(error);
		}
	}

	async add(req, res) {
		try {
			return res.json(['OK!!']);
			// res.set('Access-Control-Allow-Origin', process.env.FrontURL);
		} catch (error) {
			return res.status(500).json(error);
		}
	}

	async edit(req, res) {
		try {
			return res.json(['OK!!']);
		} catch (error) {
			return res.status(500).json(error);
		}
	}
}

module.exports = new engineController();