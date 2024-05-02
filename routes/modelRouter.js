const Router = require("express");
const router = new Router();
const modelController = require('../controllers/modelController.js');

router.post('/add', modelController.add);
router.get('/getAll', modelController.getAll);
router.get('/:id', modelController.getOne);
router.patch('/update', modelController.update);
router.delete('/delete', modelController.delete);

module.exports = router;