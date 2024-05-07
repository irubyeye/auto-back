const Car = require('../schemas/Car.js');
const Complectation = require('../schemas/Complectation.js');
const { ObjectId } = require('mongodb');

class complectationsController {
	async get(req, res) {
		try {
			return res.json(['OK!!']);
		} catch (error) {
			return res.status(500).json(error);
		}
	}

	async add(req, res) {
		try {
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
			console.log(updResult);
			return res.json(newComplect);
		} catch (error) {
			console.log("complect add error: ", error);
			return res.status(500).json(error);
		}
	}

	async update(req, res) {
		try {
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
			console.log(carUpdResult);
			return res.json(deleteResult);
		} catch (error) {
			console.log("complect del error: ", error);
			return res.status(500).json(error);
		}
	}
}

module.exports = new complectationsController();