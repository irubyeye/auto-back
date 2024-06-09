const Router = require("express");
const router = new Router();
const userController = require('../controllers/userController.js');
const { check } = require('express-validator');

router.post('/registration', [
	check('username', 'Enter username').notEmpty(),
	check('password', 'Password must be 4-10 characters long').isLength({ min: 4, max: 10 }),
], userController.registration);

router.post('/login', [
	check('username', 'Enter username').notEmpty(),
	check('password', 'Password must be 4-10 characters long').isLength({ min: 4, max: 10 }),
], userController.login);

router.patch('/update', [
	check('contacts.email', 'Wrong E-Mail address').isEmail(),
	check('contacts.phone', 'Wrong phone number').isMobilePhone(),
], userController.update);

router.get('/auth', userController.auth);

module.exports = router;