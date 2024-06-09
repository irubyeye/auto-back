const Order = require('../schemas/Order.js');
const { ObjectId } = require('mongodb');
const { validationResult } = require('express-validator');

class orderController {
	async getUserOrders(req, res) {
		try {
			const data = await Order.aggregate([
				{
					$match: {
						"client.id": new ObjectId(req.query.id)
					}
				},
				{
					$lookup: {
						from: "engines",
						localField: "car.complectation.engine",
						foreignField: "_id",
						as: "car.complectation.engine",
					}
				},
				{
					$unwind: {
						path: "$car.complectation.engine",
						preserveNullAndEmptyArrays: true,
					},
				},
				{
					$lookup: {
						from: "transmissions",
						localField: "car.complectation.transmission",
						foreignField: "_id",
						as: "car.complectation.transmission",
					}
				},
				{
					$unwind: {
						path: "$car.complectation.transmission",
						preserveNullAndEmptyArrays: true,
					},
				},
				{
					$lookup: {
						from: "suspensions",
						localField: "car.complectation.suspension",
						foreignField: "_id",
						as: "car.complectation.suspension",
					}
				},
				{
					$unwind: {
						path: "$car.complectation.suspension",
						preserveNullAndEmptyArrays: true,
					},
				},
				{
					$lookup: {
						from: "interioritems",
						localField: "car.interior.trim",
						foreignField: "_id",
						as: "car.interior.trim",
					},
				},
				{
					$unwind: {
						path: "$car.interior.trim",
						preserveNullAndEmptyArrays: true,
					},
				},
				{
					$lookup: {
						from: "interioritems",
						localField: "car.interior.seatings",
						foreignField: "_id",
						as: "car.interior.seatings",
					},
				},
				{
					$unwind: {
						path: "$car.interior.seatings",
						preserveNullAndEmptyArrays: true,
					},
				},
				{
					$lookup: {
						from: "interioritems",
						localField: "car.interior.features",
						foreignField: "_id",
						as: "car.interior.features",
					},
				},
				{
					$lookup: {
						from: "exterioritems",
						localField: "car.exterior.bumpers",
						foreignField: "_id",
						as: "car.exterior.bumpers",
					},
				},
				{
					$unwind: {
						path: "$car.exterior.bumpers",
						preserveNullAndEmptyArrays: true,
					},
				},
				{
					$lookup: {
						from: "exterioritems",
						localField: "car.exterior.spoiler",
						foreignField: "_id",
						as: "car.exterior.spoiler",
					},
				},
				{
					$unwind: {
						path: "$car.exterior.spoiler",
						preserveNullAndEmptyArrays: true,
					},
				},
				{
					$lookup: {
						from: "wheels",
						localField: "car.exterior.wheels",
						foreignField: "_id",
						as: "car.exterior.wheels",
					},
				},
				{
					$unwind: {
						path: "$car.exterior.wheels",
						preserveNullAndEmptyArrays: true,
					},
				},
				{
					$lookup: {
						from: "exterioritems",
						localField: "car.exterior.features",
						foreignField: "_id",
						as: "car.exterior.features",
					},
				},
			]);
			return res.json(data);
		} catch (error) {
			console.log(`get user orders error: ${error}`);
			return res.status(500).json(error);
		}
	}

	async getAll(req, res) {
		try {
			const orders = await Order.find({});
			return res.json(orders);
		} catch (error) {
			console.log(error);
			return res.status(500).json(error);
		}
	}

	async getOne(req, res) {
		try {
			const data = await Order.findOne({ _id: new ObjectId(req.query.id) });
			return res.json(data);
		} catch (error) {
			console.log(`get user orders error: ${error}`);
			return res.status(500).json(error);
		}
	}

	async update(req, res) {
		try {
			const { client, car, accessories, totalPrice, status } = req.body;
			const updateDocument = {
				$set: {
					client, car, accessories, totalPrice, status
				}
			}
			const updResult = await Order.updateOne({ _id: new ObjectId(req.body._id) }, updateDocument);
			return res.json(updResult);
		} catch (error) {
			console.log(error);
			return res.status(500).json(error);
		}
	}

	async create(req, res) {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) return res.status(400).json({ message: "Ordering error: ", errors })
			if (!req.body.client.contacts.email?.length && !req.body.client.contacts.phone?.length) {
				return res.status(400).json({ message: "Ordering error: ", errors: { errors: [{ msg: "At least 1 contact required" }] } })
			}
			const newOrder = await Order.create(req.body);
			return res.json(newOrder);
		} catch (error) {
			console.log(`order error: ${error}`);
			return res.status(500).json(error);
		}
	}

	async delete(req, res) {
		try {
			const result = await Order.deleteOne({ _id: new ObjectId(req.body.id) });
			return res.json(result);
		} catch (error) {
			console.log(`order delete error: ${error}`);
			return res.status(500).json(error);
		}
	}
}

module.exports = new orderController();