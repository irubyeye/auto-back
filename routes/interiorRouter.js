const Router = require("express");
const router = new Router();
const interiorController = require('../controllers/interiorController.js');

router.get('/get', interiorController.get);
router.get('/getAvailable', interiorController.getAvailable);

router.post('/add', interiorController.add);

router.patch('/update', interiorController.update);

router.delete('/delete', interiorController.delete);

module.exports = router;