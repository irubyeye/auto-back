const Car = require('../schemas/Car.js');
const Complectation = require('../schemas/Complectation.js');
const { validationResult } = require('express-validator');
const { ObjectId } = require('mongodb');

class complectationsController {
	async getAvailable(req, res) {
		try {
			const data = await Complectation.aggregate([
				{
					$match: {
						baseModel: { $in: [new ObjectId(req.query.id)] }
					}
				},
				{
					$lookup: {
						from: "engines",
						localField: "engine",
						foreignField: "_id",
						as: "engine",
					},
				},
				{
					$unwind: {
						path: "$engine",
					},
				},
				{
					$lookup: {
						from: "transmissions",
						localField: "transmission",
						foreignField: "_id",
						as: "transmission",
					},
				},
				{
					$unwind: {
						path: "$transmission",
					},
				},
				{
					$lookup: {
						from: "suspensions",
						localField: "suspension",
						foreignField: "_id",
						as: "suspension",
					},
				},
				{
					$unwind: {
						path: "$suspension",
					},
				},
			]);
			return res.json(data);
		} catch (error) {
			return res.status(500).json(error);
		}
	}

	async getOne(req, res) {
		try {
			const complect = await Complectation.aggregate([
				{
					$match: { _id: new ObjectId(req.query.id) }
				},
				{
					$lookup: {
						from: "engines",
						localField: "engine",
						foreignField: "_id",
						as: "engine",
					},
				},
				{
					$lookup: {
						from: "transmissions",
						localField: "transmission",
						foreignField: "_id",
						as: "transmission",
					},
				},
				{
					$lookup: {
						from: "suspensions",
						localField: "suspension",
						foreignField: "_id",
						as: "suspension",
					},
				},
				{
					$unwind: {
						path: '$engine'
					}
				},
				{
					$unwind: {
						path: '$transmission'
					}
				},
				{
					$unwind: {
						path: '$suspension'
					}
				},
			])
			return res.json(complect);
		} catch (error) {
			console.log(error);
			return res.status(500).json(error);
		}
	}

	async add(req, res) {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) return res.status(400).json({ message: "Complect error: ", errors })
			delete req.body._id;
			const newComplect = await Complectation.create(req.body);

			const carsFilter = {
				_id: { $in: req.body.baseModel.map(id => new ObjectId(id)) }
			}
			const carUpdateDocument = {
				$push: {
					complectations: new ObjectId(newComplect._id)
				}
			}
			// Запись комплектации для всех доступных машин
			const updResult = await Car.updateMany(carsFilter, carUpdateDocument);
			return res.json(newComplect);
		} catch (error) {
			console.log("complect add error: ", error);
			return res.status(500).json(error);
		}
	}

	async update(req, res) {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) return res.status(400).json({ message: "Complect error: ", errors })
			const updateDocument = {
				$set: {
					baseModel: req.body.baseModel,
					name: req.body.name,
					description: req.body.description,
					maxSpeed: req.body.maxSpeed,
					acceleration: req.body.acceleration,
					engine: req.body.engine,
					transmission: req.body.transmission,
					suspension: req.body.suspension,
				}
			}
			const complectUpdResult = await Complectation.updateOne({ _id: new ObjectId(req.body._id) }, updateDocument);

			const carsFilter = {
				_id: { $in: req.body.baseModel.map(id => new ObjectId(id)) },
				complectations: { $nin: [new ObjectId(req.body._id)] }
			}
			const carUpdateDocument = {
				$push: {
					complectations: new ObjectId(req.body._id)
				}
			}
			const carUpdResult = await Car.updateMany(carsFilter, carUpdateDocument);
			return res.json(complectUpdResult);
		} catch (error) {
			console.log("complect upd error: ", error);
			return res.status(500).json(error);
		}
	}

	async delete(req, res) {
		try {
			const carsFilter = {
				_id: { $in: req.body.baseModel.map(id => new ObjectId(id)) }
			}
			const carUpdateDocument = {
				$pull: {
					complectations: new ObjectId(req.body._id)
				}
			}
			// Удаляем id комплекта из всех машин
			const carUpdResult = await Car.updateMany(carsFilter, carUpdateDocument);

			const deleteResult = await Complectation.deleteOne({ _id: new ObjectId(req.body._id) });
			return res.json(deleteResult);
		} catch (error) {
			console.log("complect del error: ", error);
			return res.status(500).json(error);
		}
	}
}

module.exports = new complectationsController();