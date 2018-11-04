'use strict';
const createError = require('http-errors');
const token = require('./token');
const User = require('../db/user');
const userHelpers = require('../lib/helpers/user');

module.exports = async function authMiddleWare(req, res, next) {
  const authHeader = req.header('Authorization');
  let { authToken } = req.query;

  if (!authHeader && !authToken) {
    return next(createError(401, 'Unauthorized'));
  }

  const [, accessToken] = /Bearer (.+)/.exec(authHeader) || [, authToken];
  if (!accessToken) {

    return next(createError(401, 'Access token must be provided'))
  }
  try {
    const encoded = await token.verify(accessToken);
    const user = await User.findById(encoded.id);
    if (!user) {

      return next(createError(401, 'Unauthorized'))
    }
    req.userData = userHelpers.getUserData(user);
    next();
  } catch (error) {
    // if (error.name === 'JsonWebTokenError') {
    //   const device = deviceId ? await Device.findOne({ deviceId, firstSignedAt: { $ne: null } }) : null;
    //   const errorData = device
    //     ? { message: 'Unauthorized' }
    //     : { reason: { wasNeverSigned: true }, message: getFirstSignedErrorMessage() };
    //
    //   return next(createError(401, errorData));
    // }
    // next(createError(500, error));
  }
};

function getFirstSignedErrorMessage() {
  return 'Our apologies: We recently updated our backend system requiring users to login to their account again. We hope to limit such occurrences going forward';
}
