const { Router } = require('express');
const router = Router();
const authRouter = require('./auth')
const collectionrouter = require('./collection')
const { jwtVerify } = require("../../middelwares")

router.use('/auth', authRouter);
router.use('/company', jwtVerify, collectionrouter);


module.exports = router;