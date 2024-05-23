const User = require('../schemas/User.js');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

const secret = process.env.secret;

const generateAccessToken = (id, username, roles) => {
	const payload = {
		id,
		username,
		roles
	}
	return jwt.sign(payload, secret, { expiresIn: "24h" })
}

class userController {
	async registration(req, res) {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) return res.status(400).json({ message: "Registration error: ", errors })
			const { username, password } = req.body;
			const candidate = await User.findOne({ username });
			if (candidate) return res.status(400).json({ message: "Username already exists" });

			const hashPassword = bcrypt.hashSync(password, 7);
			const user = await User.create({ username: req.body.username, password: hashPassword });
			const token = generateAccessToken(user._id, user.username, user.roles);
			return res.json({ user, token });
		} catch (e) {
			console.log(e);
			return res.status(500).json(e);
		}
	}

	async login(req, res) {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) return res.status(400).json({ message: "Registration error: ", errors })
			const { username, password } = req.body;
			const user = await User.findOne({ username });
			if (!user) return res.status(400).json({ message: `User ${username} not found` });
			const validPassword = bcrypt.compareSync(password, user.password);
			if (!validPassword) return res.status(400).json({ message: `Password is invalid` });
			const token = generateAccessToken(user._id, user.username, user.roles);
			return res.json({ user, token });
		} catch (error) {
			console.log(error);
			return res.status(500).json(e);
		}
	}

	async auth(req, res) {
		try {

			const token = req.headers.authorization.split(' ')[1];
			if (!token) return res.status(403).json({ message: `User not authorized` });
			const decodedData = jwt.verify(token, process.env.secret);
			const user = await User.findOne({ _id: decodedData.id });
			console.log(user);
			return res.json(user);
		} catch (error) {
			console.log(error);
			return res.status(500).json(error);
		}
	}
}

module.exports = new userController();