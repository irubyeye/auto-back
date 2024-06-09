const Car = require('../schemas/Car.js');
const Complectation = require('../schemas/Complectation.js');
const Engine = require('../schemas/Engine.js');
const Transmission = require('../schemas/Transmission.js');
const Suspension = require('../schemas/Suspension.js');
const InteriorItem = require('../schemas/InteriorItem.js');
const ExteriorItem = require('../schemas/ExteriorItem.js');
const Wheels = require('../schemas/Wheels.js');
const { ObjectId } = require('mongodb');
const { validationResult } = require('express-validator');

const appearanceUseID = (car, category) => {
	for (const key in car?.[category]) {
		if (key === "_id") continue;
		if (Array.isArray(car[category][key])) {
			if (typeof car[category][key][0] === 'string') return;
			car[category][key] = car[category][key].map(item => item = item._id);
		} else {
			if (typeof car[category][key] === 'string') return;
			car[category][key] = car[category][key]._id;
		}
	}
	if (car[category] && !Object.keys(car[category]).filter(key => key !== 'features').length && !car[category].features.length) {
		delete car[category];
	}
}

class modelController {
	async add(req, res) {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) return res.status(400).json({ message: "Creation error: ", errors })
			delete req.body._id;
			const newCar = await Car.create(req.body);
			appearanceUseID(req.body, 'interior');
			appearanceUseID(req.body, 'exterior');
			const complectPatch = {
				$push: { baseModel: new ObjectId(newCar._id) }
			}
			const complectUpdate = await Complectation.updateMany({ _id: { $in: req.body?.complectations } }, complectPatch);

			const appearanceItemPatch = {
				$push: { availableFor: new ObjectId(newCar._id) }
			}
			const interiorsFilter = {
				_id: {
					$in: [req.body?.interior?.trim, req.body?.interior?.seatings]
				}
			}
			if (req.body?.interior?.features) interiorsFilter._id.$in.push(...req.body?.interior?.features);
			const InteriorsUpdate = await InteriorItem.updateMany(interiorsFilter, appearanceItemPatch);

			const exteriorsFilter = {
				_id: {
					$in: [req.body?.exterior?.bumpers, req.body?.exterior?.spoiler]
				}
			}
			if (req.body?.exterior?.features) exteriorsFilter._id.$in.push(...req.body?.exterior?.features);
			const ExteriorsUpdate = await ExteriorItem.updateMany(exteriorsFilter, appearanceItemPatch);
			const WheelsUpdate = await Wheels.updateOne({ _id: new ObjectId(req.body?.exterior?.wheels) }, appearanceItemPatch);

			// res.set('Access-Control-Allow-Origin', process.env.FrontURL);
			return res.json(newCar);
		} catch (error) {
			console.log(error);
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

			pipeline.push({
				$project: {
					_id: 1,
					img: 1,
					model: 1,
				},
			});

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
				{
					$lookup: {
						from: "interioritems",
						localField: "interior.trim",
						foreignField: "_id",
						as: "interior.trim",
					},
				},
				{
					$lookup: {
						from: "interioritems",
						localField: "interior.seatings",
						foreignField: "_id",
						as: "interior.seatings",
					},
				},
				{
					$lookup: {
						from: "interioritems",
						localField: "interior.features",
						foreignField: "_id",
						as: "interior.features",
					},
				},
				{
					$lookup: {
						from: "exterioritems",
						localField: "exterior.bumpers",
						foreignField: "_id",
						as: "exterior.bumpers",
					},
				},
				{
					$lookup: {
						from: "exterioritems",
						localField: "exterior.spoiler",
						foreignField: "_id",
						as: "exterior.spoiler",
					},
				},
				{
					$lookup: {
						from: "wheels",
						localField: "exterior.wheels",
						foreignField: "_id",
						as: "exterior.wheels",
					},
				},
				{
					$lookup: {
						from: "exterioritems",
						localField: "exterior.features",
						foreignField: "_id",
						as: "exterior.features",
					},
				},
				{
					$unwind: {
						path: '$interior.trim',
						preserveNullAndEmptyArrays: true
					}
				},
				{
					$unwind: {
						path: '$interior.seatings',
						preserveNullAndEmptyArrays: true
					}
				},
				{
					$unwind: {
						path: '$exterior.bumpers',
						preserveNullAndEmptyArrays: true
					}
				},
				{
					$unwind: {
						path: '$exterior.spoiler',
						preserveNullAndEmptyArrays: true
					}
				},
				{
					$unwind: {
						path: '$exterior.wheels',
						preserveNullAndEmptyArrays: true
					}
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
					exterior: req.body.exterior,
					complectations: req.body.complectations
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
			const complectPatch = {
				$pull: {
					baseModel: {
						$in: [new ObjectId(req.body._id)]
					}
				}
			}
			const complectFilter = { baseModel: { $in: new ObjectId(req.body._id) } }
			const complectUpdate = await Complectation.updateMany(complectFilter, complectPatch);

			const appearanceItemPatch = {
				$pull: { availableFor: { $in: [req.body._id] } }
			}
			const InteriorsUpdate = await InteriorItem.updateMany({ availableFor: { $in: req.body._id } }, appearanceItemPatch);
			const ExteriorsUpdate = await ExteriorItem.updateMany({ availableFor: { $in: req.body._id } }, appearanceItemPatch);
			const WheelsUpdate = await Wheels.updateMany({ availableFor: { $in: req.body._id } }, appearanceItemPatch);
			return res.json({ deleteResult: result, updateResult: { complectUpdate, InteriorsUpdate, ExteriorsUpdate, WheelsUpdate } });
		} catch (error) {
			console.log(error);
			return res.status(500).json(error);
		}
	}
}

module.exports = new modelController();