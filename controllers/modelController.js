const Car = require('../schemas/Car.js');
const { ObjectId } = require('mongodb');

class modelController {
	async add(req, res) {
		try {
			delete req.body._id;
			delete req.body.complectations;
			const newCar = await Car.create(req.body);
			// res.set('Access-Control-Allow-Origin', process.env.FrontURL);
			return res.json(newCar);
		} catch (error) {
			console.log(error);
			return res.status(500).json(error);
		}
	}

	async getAll(req, res) {
		try {
			const data = await Car.find();
			console.log(data);
			return res.json(data);
		} catch (error) {
			return res.status(500).json(error);
		}
	}

	async getOne(req, res) {
		try {
			const data = await Car.aggregate([
				{
					$match: {
						_id: new ObjectId(req.query.id),
					},
				},
				{
					$lookup: {
						from: "complectations",
						localField: "complectations",
						foreignField: "_id",
						as: "complectations",
					},
				},
				{
					$unwind: {
						path: "$complectations",
					},
				},
				{
					$lookup: {
						from: "colors",
						localField: "colors",
						foreignField: "_id",
						as: "colors",
					}
				},
				{
					$lookup: {
						from: "engines",
						localField: "complectations.engine",
						foreignField: "_id",
						as: "complectations.engine",
					},
				},
				{
					$unwind: {
						path: "$complectations.engine",
					},
				},
				{
					$lookup: {
						from: "transmissions",
						localField: "complectations.transmission",
						foreignField: "_id",
						as: "complectations.transmission",
					},
				},
				{
					$unwind: {
						path: "$complectations.transmission",
					}
				},
				{
					$lookup: {
						from: "suspensions",
						localField: "complectations.suspension",
						foreignField: "_id",
						as: "complectations.suspension",
					},
				},
				{
					$unwind: {
						path: "$complectations.suspension",
					},
				},
				{
					$lookup: {
						from: "optionPacks",
						localField: "optionPacks",
						foreignField: "_id",
						as: "optionPacks",
					},
				},
				{
					$group: {
						_id: "$_id",
						img: {
							$first: "$img",
						},
						origin: {
							$first: "$origin",
						},
						brand: {
							$first: "$brand",
						},
						model: {
							$first: "$model",
						},
						body: {
							$first: "$body",
						},
						engineDisplacement: {
							$first: "$engineDisplacement",
						},
						modelYear: {
							$first: "$modelYear",
						},
						basePrice: {
							$first: "$basePrice",
						},
						complectations: {
							$push: "$complectations",
						},
						colors: {
							$first: "$colors",
						},
						optionPacks: {
							$first: "$optionPacks",
						},
					},
				},
			]);
			res.json(data);
		} catch (error) {
			return res.status(500).json(error);
		}
	}

	async update(req, res) {
		try {
			const updateDocument = {
				$set: { img: req.body.img },
				$set: { origin: req.body.origin },
				$set: { brand: req.body.brand },
				$set: { model: req.body.model },
				$set: { body: req.body.body },
				$set: { engineDisplacement: req.body.engineDisplacement },
				$set: { modelYear: req.body.modelYear },
				$set: { basePrice: req.body.basePrice },
				$set: { complectations: new ObjectId(req.body.complectations._id) },
				$set: { colors: new ObjectId(req.body.colors._id) },
				$set: { optionPacks: new ObjectId(req.body.optionPacks._id) },
			};

			const result = await Car.updateOne({ _id: new ObjectId(req.body._id) }, updateDocument);
			return res.json(result);
		} catch (error) {
			console.log(error);
			return res.status(500).json(error);
		}
	}

	async delete(req, res) {
		try {
			const result = await Car.deleteOne({ _id: new ObjectId(req.body._id) });
			return res.json(result);
		} catch (error) {
			console.log(error);
			return res.status(500).json(error);
		}
	}
}

module.exports = new modelController();