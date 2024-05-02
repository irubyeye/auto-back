const Router = require("express");
const router = new Router();
const colorController = require('../controllers/colorController.js');

router.post('/add', colorController.add);
router.get('/getAvailable', colorController.getAvailable);

module.exports = router;