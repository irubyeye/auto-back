// imports
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const router = require('./routes/index.js');

const DB = process.env.DB;
const PORT = process.env.PORT || 8080;

const app = express();
// middleware парсить жсон
app.use(express.json());
// mw для кроссдоменных запросов
app.use(cors());
app.use('/api', router);

async function startServer() {
	try {
		await mongoose.connect(DB, { autoIndex: false });
		app.listen(PORT, () => { console.log(`Server started on port ${PORT}!`); });
	} catch (e) {
		console.log(e);
	}
}

startServer();
