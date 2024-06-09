const Router = require("express");
const router = new Router();
const userRouter = require("./userRouter");
const modelRouter = require("./modelRouter");
const complectationRouter = require('./complectationsRouter');
const engineRouter = require('./engineRouter');
const transmissionRouter = require('./transmissionRouter');
const suspensionRouter = require('./suspensionRouter');
const interiorRouter = require('./interiorRouter');
const exteriorRouter = require('./exteriorRouter');
const wheelsRouter = require('./wheelsRouter');
const accessoriesRouter = require('./accessoriesRouter');
const ordersRouter = require('./orderRouter');

router.use('/users', userRouter);
router.use('/models', modelRouter);
router.use('/complectations', complectationRouter);
router.use('/engines', engineRouter);
router.use('/transmissions', transmissionRouter);
router.use('/suspensions', suspensionRouter);

router.use('/interior-items', interiorRouter);
router.use('/exterior-items', exteriorRouter);

router.use('/wheels', wheelsRouter);
router.use('/accessories', accessoriesRouter);
router.use('/orders', ordersRouter);

module.exports = router;