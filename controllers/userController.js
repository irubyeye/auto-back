const User = require('../schemas/User.js');

class userController {
	async registration(req, res) {
		try {
			await User.create({ name: req.body.username })

			// res.set('Access-Control-Allow-Origin', process.env.FrontURL, /* "http://localhost:3000/" */);
			return res.json("User created");
		} catch (e) {
			console.log(e);
			return res.status(500).json(e);
		}
	}

	async login(req, res) {
		res.json({ message: "OK" });
	}

	async auth(req, res) {
		res.json({ message: "OK" });
	}
}

module.exports = new userController();