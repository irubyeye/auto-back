const Router = require("express");
const router = new Router();
const transmissionController = require('../controllers/transmissionController.js');

router.post('/add', transmissionController.add);
router.get('/getAvailable', transmissionController.getAvailable);
router.patch('/update', transmissionController.update);
router.delete('/delete', transmissionController.delete);

module.exports = router;