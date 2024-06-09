const Router = require("express");
const router = new Router();
const accessoriesController = require('../controllers/accessoriesController.js');

router.get('/get', accessoriesController.get);

router.post('/add', accessoriesController.add);

router.patch('/update', accessoriesController.update);

router.delete('/delete', accessoriesController.delete);

module.exports = router;