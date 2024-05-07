const Router = require("express");
const router = new Router();
const suspensionController = require('../controllers/suspensionController.js');

router.post('/add', suspensionController.add);
router.get('/getAvailable', suspensionController.getAvailable);
router.patch('/update', suspensionController.update);
router.delete('/delete', suspensionController.delete);

module.exports = router;