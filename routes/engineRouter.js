const Router = require("express");
const router = new Router();
const engineController = require('../controllers/engineController.js');

router.get('/getAvailable', engineController.getAvailable);
router.post('/add', engineController.add);
router.put('/edit', engineController.edit);

module.exports = router;