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
			console.log(`transmission getAvailable error: ${error}`);
			return res.status(500).json(error);
		}
	}

	async add(req, res) {
		try {
			delete req.body._id;
			const transmission = await Transmission.create(req.body);
			return res.json(transmission);
		} catch (error) {
			console.log(`transmission add error: ${error}`);
			return res.status(500).json(error);
		}
	}

	async update(req, res) {
		try {
			const updateDocument = {
				$set: {
					availableFor: req.body.availableFor,
					type: req.body.type,
					drive: req.body.drive,
					gears: req.body.gears,
				},
			};
			// update if _id match or upsert & return new
			const result = await Transmission.findOneAndUpdate({ _id: new ObjectId(req.body._id) }, updateDocument, { upsert: true, new: true });
			return res.json(result);
		} catch (error) {
			console.log(`transmission update error: ${error}`);
			return res.status(500).json(error);
		}
	}

	async delete(req, res) {
		try {
			const result = await Transmission.deleteOne({ _id: new ObjectId(req.body._id) });
			return res.json(result);
		} catch (error) {
			console.log(`transmission delete error: ${error}`);
			return res.status(500).json(error);
		}
	}
}

module.exports = new transmissionController();