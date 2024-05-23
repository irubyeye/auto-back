const Router = require("express");
const router = new Router();
const { check } = require('express-validator');
const modelController = require('../controllers/modelController.js');

const currentYear = new Date().getFullYear();
const modelCheckSet = [
	check("img", "Set images").notEmpty(),
	check("brand", "Set brand").notEmpty(),
	check("model", "Set model").notEmpty(),
	check("body", "Set body").notEmpty(),
	check("modelYear", "Model year must be from 1900 to " + currentYear).isInt({ min: 1900, max: currentYear }),
	check("basePrice", "Base price must be greater than 0").isInt({ gt: 0 }),
]

router.post('/add', modelCheckSet, modelController.add);

router.get('/getMany', modelController.getMany);
router.get('/:id', modelController.getOne);

router.patch('/update', modelCheckSet, modelController.update);
router.patch('/deleteColor', modelController.deleteColor);
router.patch('/addColor', [
	check("img.color", "Set color").notEmpty(),
	check("img.srcset", "Provide valid images URLs").isURL()
], modelController.addColor);

router.delete('/delete', modelController.delete);

module.exports = router;