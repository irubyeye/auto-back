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
const colorRouter = require('./colorRouter');
const wheelsRouter = require('./wheelsRouter');

router.use('/users', userRouter);
router.use('/models', modelRouter);
router.use('/complectations', complectationRouter);
router.use('/engines', engineRouter);
router.use('/transmissions', transmissionRouter);
router.use('/suspensions', suspensionRouter);

router.use('/interior-items', interiorRouter);
router.use('/exterior-items', exteriorRouter);

router.use('/wheels', wheelsRouter);
router.use('/colors', colorRouter);

module.exports = router;