const userRouter = require('express').Router();
const userHandlers = require('./handlers');

userRouter.get('/users', userHandlers.userListGET);

userRouter.get('/users/:id', userHandlers.userByIdGET);

userRouter.put('/users/:id', userHandlers.userPUT);

userRouter.post('/users', userHandlers.userPOST);

userRouter.delete("/users/:id", userHandlers.userDELETE);

module.exports = userRouter;
