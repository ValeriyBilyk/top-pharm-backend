const drugActionRouter = require('express').Router();
const drugActionHandlers = require('./handlers');

drugActionRouter.post('/drug-actions', drugActionHandlers.drugActionPOST);

drugActionRouter.get('/drug-actions', drugActionHandlers.drugActionGET);

drugActionRouter.get('/users-orders', drugActionHandlers.usersOrdersGET);

drugActionRouter.delete('/drug-actions/:id', drugActionHandlers.revertDrugAction);

module.exports = drugActionRouter;
