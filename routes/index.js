const Router = require("express");
const router = new Router();
const userRouter = require("./userRouter");
const modelRouter = require("./modelRouter");
const engineRouter = require('./engineRouter');
const interiorsRouter = require('./interiorsRouter');
const complectationRouter = require('./complectationsRouter');
const colorRouter = require('./colorRouter');
const transmissionRouter = require('./transmissionRouter');
const suspensionRouter = require('./suspensionRouter');

router.use('/users', userRouter);
router.use('/models', modelRouter);
router.use('/complectations', complectationRouter);
router.use('/engines', engineRouter);
router.use('/transmissions', transmissionRouter);
router.use('/suspensions', suspensionRouter);
router.use('/interiors', interiorsRouter);
router.use('/colors', colorRouter);

module.exports = router;