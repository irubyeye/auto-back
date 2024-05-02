const Router = require("express");
const router = new Router();
const transmissionController = require('../controllers/transmissionController.js');

router.post('/add', transmissionController.add);
router.get('/getAvailable', transmissionController.getAvailable);

module.exports = router;