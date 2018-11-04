const drugRouter = require('express').Router();
const drugHandlers = require('./handlers');

drugRouter.post('/drugs', drugHandlers.drugPOST);

drugRouter.get('/drugs', drugHandlers.drugsGET);

module.exports = drugRouter;