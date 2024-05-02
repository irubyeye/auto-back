const Router = require("express");
const router = new Router();
const suspensionController = require('../controllers/suspensionController.js');

router.post('/add', suspensionController.add);
router.get('/getAvailable', suspensionController.getAvailable);

module.exports = router;