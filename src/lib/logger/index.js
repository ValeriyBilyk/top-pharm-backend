const bunyan = require('bunyan');
const customLogger = require('./custom-logger');

const log = bunyan.createLogger({
  name: 'Debut app',
  serializers: {
    req: (req) => Object.assign(bunyan.stdSerializers.req(req), {
      id: req.id,
      body: req.body,
      query: req.query
    }),
  }
});

const logger = {
  requestMiddleWareLogger,
  log: Object.assign(log, {custom: customLogger})
};

module.exports = logger;

function requestMiddleWareLogger(req, res, next) {
  req.log = logger.log.child({ requestId: req.id });
  req.logInfo = logRequest;
  !process.debutIsProd() && req.logInfo();
  next();
}

function logRequest() {
  logger.log.info({ req: this })
}
