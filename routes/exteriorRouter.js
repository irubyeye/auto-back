const Router = require("express");
const router = new Router();
const exteriorController = require('../controllers/exteriorController.js');

router.get('/get', exteriorController.get);
router.get('/getAvailable', exteriorController.getAvailable);

router.post('/add', exteriorController.add);

router.patch('/update', exteriorController.update);

router.delete('/delete', exteriorController.delete);

module.exports = router;