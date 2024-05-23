const Router = require("express");
const router = new Router();
const { check } = require('express-validator');
const complectationsController = require('../controllers/complectationsController.js');

const complectCheckSet = [
	check("name", "Set complect name").notEmpty(),
	check("description.en", "Set english description").notEmpty(),
	check("description.ua", "Set ukrainian description").notEmpty(),
	check("maxSpeed", "Max speed must be from 50 to 400").isInt({ min: 50, max: 400 }),
	check("acceleration", "Acceleration must be from 0.1 to 10").isInt({ gt: 0, max: 10 }),
	check("engine", "Engine not set").notEmpty(),
	check("transmission", "Transmission not set").notEmpty(),
	check("suspension", "Suspension not set").notEmpty(),
]

router.get('/getAvailable', complectationsController.getAvailable);

router.post('/add', complectCheckSet, complectationsController.add);

router.patch('/update', complectCheckSet, complectationsController.update);

router.delete('/delete', complectationsController.delete);

module.exports = router;