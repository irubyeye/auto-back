const Car = require('../schemas/Car.js');
const { ObjectId } = require('mongodb');
const { validationResult } = require('express-validator');

class modelController {
	async add(req, res) {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) return res.status(400).json({ message: "Creation error: ", errors })
			delete req.body._id;
			delete req.body.complectations;
			const newCar = await Car.create(req.body);

			const carComplete = await Car.aggregate([
				{
					$match: { _id: newCar._id }
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
					$group: {
						_id: "$_id",
						img: {
							$first: "$img",
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
							$first: "$complectations",
						},
						colors: {
							$first: "$colors",
						},
					},
				},
			]);
			// res.set('Access-Control-Allow-Origin', process.env.FrontURL);
			return res.json(carComplete[0]);
		} catch (error) {
			return res.status(500).json(error);
		}
	}

	async getMany(req, res) {
		try {
			const pipeline = [];

			if (req.query.brand) {
				pipeline.push({
					$match: {
						brand: req.query.brand
					}
				})
			}

			if (req.query.skip) {
				pipeline.push({
					$skip: +req.query.skip
				})
			}

			if (req.query.limit) {
				pipeline.push({
					$limit: +req.query.limit
				})
			}

			const data = await Car.aggregate(pipeline);
			return res.json(data);
		} catch (error) {
			console.log("getCarsError: " + error);
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
				// {
				// 	$lookup: {
				// 		from: "complectations",
				// 		localField: "complectations",
				// 		foreignField: "_id",
				// 		as: "complectations",
				// 	},
				// },
				// {
				// 	$unwind: {
				// 		path: "$complectations",
				// 	},
				// },
				// {
				// 	$lookup: {
				// 		from: "engines",
				// 		localField: "complectations.engine",
				// 		foreignField: "_id",
				// 		as: "complectations.engine",
				// 	},
				// },
				// {
				// 	$unwind: {
				// 		path: "$complectations.engine",
				// 	},
				// },
				// {
				// 	$lookup: {
				// 		from: "transmissions",
				// 		localField: "complectations.transmission",
				// 		foreignField: "_id",
				// 		as: "complectations.transmission",
				// 	},
				// },
				// {
				// 	$unwind: {
				// 		path: "$complectations.transmission",
				// 	}
				// },
				// {
				// 	$lookup: {
				// 		from: "suspensions",
				// 		localField: "complectations.suspension",
				// 		foreignField: "_id",
				// 		as: "complectations.suspension",
				// 	},
				// },
				// {
				// 	$unwind: {
				// 		path: "$complectations.suspension",
				// 	},
				// },
				// {
				// 	$group: {
				// 		_id: "$_id",
				// 		img: {
				// 			$first: "$img",
				// 		},
				// 		brand: {
				// 			$first: "$brand",
				// 		},
				// 		model: {
				// 			$first: "$model",
				// 		},
				// 		body: {
				// 			$first: "$body",
				// 		},
				// 		engineDisplacement: {
				// 			$first: "$engineDisplacement",
				// 		},
				// 		modelYear: {
				// 			$first: "$modelYear",
				// 		},
				// 		basePrice: {
				// 			$first: "$basePrice",
				// 		},
				// 		complectations: {
				// 			$push: "$complectations",
				// 		},
				// 	},
				// },
			]);
			return res.json(data);
		} catch (error) {
			return res.status(500).json(error);
		}
	}

	async update(req, res) {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) return res.status(400).json({ message: "Update error: ", errors })
			const updateDocument = {
				$set: {
					img: req.body.img,
					origin: req.body.origin,
					brand: req.body.brand,
					model: req.body.model,
					body: req.body.body,
					engineDisplacement: req.body.engineDisplacement,
					modelYear: req.body.modelYear,
					basePrice: req.body.basePrice,
					interior: req.body.interior,
					exterior: req.body.exterior
					// optionPacks: new ObjectId(req.body.optionPacks?._id),
				},
			};
			const result = await Car.updateOne({ _id: new ObjectId(req.body._id) }, updateDocument);
			return res.json(result);
		} catch (error) {
			console.log(error);
			return res.status(500).json(error);
		}
	}

	async deleteColor(req, res) {
		try {
			const updateDocument = {
				$pull: { img: { color: req.body.img.color } }
			}
			const result = await Car.updateOne({ _id: new ObjectId(req.body._id) }, updateDocument);
			return res.json(result);
		} catch (error) {
			return res.status(500).json(error);
		}
	}

	async addColor(req, res) {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) return res.status(400).json({ message: "Color error: ", errors })
			const updateDocument = {
				$push: { img: { color: req.body.img.color, srcset: req.body.img.srcset } }
			}
			const result = await Car.updateOne({ _id: new ObjectId(req.body._id) }, updateDocument);
			return res.json(result);
		} catch (error) {
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