const Router = require("express");
const router = new Router();
const { check } = require('express-validator');
const orderController = require('../controllers/orderController.js');


router.post('/create', [
	check('client.contacts.email', 'Wrong e-mail').optional({ values: 'falsy' }).isEmail(),
	check('client.contacts.phone', 'Wrong phone').optional({ values: 'falsy' }).isMobilePhone(),
], orderController.create);

router.get('/getUserOrders', orderController.getUserOrders);
router.get('/getOne', orderController.getOne);
router.get('/getAll', orderController.getAll);

router.patch('/update', orderController.update);
router.delete('/delete', orderController.delete);

module.exports = router;