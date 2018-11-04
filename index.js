const express = require('express');
const cors = require('cors');
const {pick: _pick} = require('lodash');
const bodyParser = require('body-parser');
require('dotenv').config();

const db = require('./src/db');
const appRouter = require('./src/routes');
const {log, requestMiddleWareLogger} = require('./src/lib/logger');
require('./src/lib/helpers/process');
const app = express();

const PORT = process.env.PORT || 3100;

app
  .use(cors())
  .use(bodyParser.json({limit: '1mb'}))
  .use(bodyParser.urlencoded({ extended: true, limit: '1mb' }))
  .use(requestMiddleWareLogger)
  .use('/api', appRouter);

app.use((req, res, next) => next(Object.assign(new Error('Resource not found'), {status: 404})));
app.use((error, req, res, next) => {
  log.error(error);
  process.debutIsProd() && req.logInfo();
  const httpError = error.status ? error : Object.assign(new Error('Server error'), {status: 500});
  return res.status(httpError.status).send(_pick(httpError, ['message', 'status', 'reason']));
});

db.connect()
  .then(() => db.presetModels())
  .then(() => app.listen(PORT, () => log.info(`App is listening on port ${PORT} ...`)));

process.on('uncaughtException', (error) => {
  log.error(error);
});
process.on('unhandledRejection', (error) => {
  log.error(error);
});

