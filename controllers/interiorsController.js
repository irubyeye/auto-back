const Interior = require('../schemas/Interior.js');
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
			// res.set('Access-Control-Allow-Origin', process.env.FrontURL);
		} catch (error) {
			return res.status(500).json(error);
		}
	}

	async getAvailable(req, res) {
		try {
			const data = await Interior.aggregate([
				{
					$match: {
						availableFor: { $in: [new ObjectId(req.query.id)] }
					}
				},
				{
					$lookup: {
						from: "features",
						localField: "interiorTrim",
						foreignField: "_id",
						as: "interiorTrim",
					},
				},
				{
					$unwind: {
						path: "$interiorTrim",
					},
				},
				{
					$lookup: {
						from: "colors",
						localField: "colors",
						foreignField: "_id",
						as: "colors",
					},
				},
				{
					$group: {
						_id: "$_id",
						interiorTrim: {
							$first: "$interiorTrim",
						},
						colors: {
							$first: "$colors"
						},
						price: {
							$first: "$price",
						},
					},
				}
			])
			return res.json(data);
		} catch (error) {
			console.log(error);
			return res.status(500).json(error);
		}
	}
}

module.exports = new interiorsController();