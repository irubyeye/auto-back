const Router = require("express");
const router = new Router();
const interiorsController = require('../controllers/interiorsController.js');

router.get('/get', interiorsController.get);
router.get('/getAvailable', interiorsController.getAvailable);
router.post('/add', interiorsController.add);

module.exports = router;