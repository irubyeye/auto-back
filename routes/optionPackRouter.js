const Router = require("express");
const router = new Router();
const optionPacksController = require('../controllers/optionPacksController.js');

router.get('/getAvailable', optionPacksController.getAvailable);
router.post('/add', optionPacksController.add);

module.exports = router;