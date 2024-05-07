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
			console.log(`engine getAvailable error: ${error}`);
			return res.status(500).json(error);
		}
	}

	async add(req, res) {
		try {
			delete req.body._id;
			const newEngine = await Engine.create(req.body);
			return res.json(newEngine);
		} catch (error) {
			console.log(`engine add error: ${error}`);
			return res.status(500).json(error);
		}
	}

	async update(req, res) {
		try {
			const updateDocument = {
				$set: {
					availableFor: req.body.availableFor,
					manufacturer: req.body.manufacturer,
					model: req.body.model,
					volume: req.body.volume,
					hp: req.body.hp,
					torque: req.body.torque,
					turbo: req.body.turbo,
				},
			};
			// update if _id match or upsert & return new
			const result = await Engine.findOneAndUpdate({ _id: new ObjectId(req.body._id) }, updateDocument, { upsert: true, new: true });
			return res.json(result);
		} catch (error) {
			console.log(`engine update error: ${error}`);
			return res.status(500).json(error);
		}
	}

	async delete(req, res) {
		try {
			const result = await Engine.deleteOne({ _id: new ObjectId(req.body._id) });
			return res.json(result);
		} catch (error) {
			console.log(`engine delete error: ${error}`);
			return res.status(500).json(error);
		}
	}
}

module.exports = new engineController();