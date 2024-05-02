const Router = require("express");
const router = new Router();
const complectationsController = require('../controllers/complectationsController.js');

router.get('/get', complectationsController.get);
router.post('/add', complectationsController.add);

module.exports = router;