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
			console.log(`suspension getAvailable error: ${error}`);
			return res.status(500).json(error);
		}
	}

	async add(req, res) {
		try {
			delete req.body._id;
			const newSuspension = await Suspension.create(req.body);
			return res.json(newSuspension);
		} catch (error) {
			console.log(`suspension add error: ${error}`);
			return res.status(500).json(error);
		}
	}

	async update(req, res) {
		try {
			const updateDocument = {
				$set: {
					availableFor: req.body.availableFor,
					type: req.body.type,
				},
			};
			// update if _id match or upsert & return new
			const result = await Suspension.findOneAndUpdate({ _id: new ObjectId(req.body._id) }, updateDocument, { upsert: true, new: true });
			return res.json(result);
		} catch (error) {
			console.log(`suspension update error: ${error}`);
			return res.status(500).json(error);
		}
	}

	async delete(req, res) {
		try {
			const result = await Suspension.deleteOne({ _id: new ObjectId(req.body._id) });
			return res.json(result);
		} catch (error) {
			console.log(`suspension delete error: ${error}`);
			return res.status(500).json(error);
		}
	}
}

module.exports = new suspensionController();