const Router = require("express");
const router = new Router();
const { check } = require('express-validator');
const orderController = require('../controllers/orderController.js');


router.post('/create', orderController.create);

router.get('/getUserOrders', orderController.getUserOrders);
router.get('/getOne', orderController.getOne);

// router.patch('/update', orderController.update);
router.delete('/delete', orderController.delete);

module.exports = router;