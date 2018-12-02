const appRouter = require('express').Router();
const { authMiddleWare } = require('../auth');
const authRouter = require('./auth');
const userRouter = require('./user');
const drugRouter = require('./drug');
const drugActionRouter = require('./drugAction');

appRouter
  .use('/v1/auth', authRouter)
  .use('/v1', userRouter)
  .use('/v1', drugRouter)
  .use('/v1', drugActionRouter)

module.exports = appRouter;