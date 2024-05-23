const Router = require("express");
const router = new Router();
const wheelController = require('../controllers/wheelController');

router.get('/getAvailable', wheelController.getAvailable);
router.post('/add', wheelController.add);
router.patch('/update', wheelController.update);

module.exports = router;