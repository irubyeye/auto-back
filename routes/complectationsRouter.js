const Router = require("express");
const router = new Router();
const complectationsController = require('../controllers/complectationsController.js');

router.get('/get', complectationsController.get);
router.post('/add', complectationsController.add);
router.patch('/update', complectationsController.update);
router.delete('/delete', complectationsController.delete);

module.exports = router;