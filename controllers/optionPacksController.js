const optionPacks = require('../schemas/optionPacks.js');
const { ObjectId } = require('mongodb');

class optionPacksController {
	async getAvailable(req, res) {
		try {
			const data = await optionPacks.aggregate([
				{
					$match: {
						availableFor: { $in: [new ObjectId(req.query.id)] }
					}
				},
				{
					$lookup: {
						from: "features",
						localField: "features",
						foreignField: "_id",
						as: "features",
					},
				},
			]);
			return res.json(data);
		} catch (error) {
			return res.status(500).json(error);
		}
	}

	async add(req, res) {
		try {
			const result = await optionPacks.create(req.body);
			return res.json(result);
			// cors — access from front app (if hosted on different domain than back app)
			// res.set('Access-Control-Allow-Origin', process.env.FrontURL);
		} catch (error) {
			return res.status(500).json(error);
		}
	}
}

module.exports = new optionPacksController();