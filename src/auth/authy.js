const util = require('util');
const authy = require('authy')(process.env.AUTHY_ENV_KEY);

const ACTIVATION_CODE_LENGTH = 4;

const authyPhones = authy.phones();
const defaultVerificationStartParams = {
  code_length: ACTIVATION_CODE_LENGTH
};

const authyVerificationStartPromisified =  util.promisify(authyPhones.verification_start);

module.exports = {
  ACTIVATION_CODE_LENGTH,
  registerUser: util.promisify(authy.register_user.bind(authy)),
  verificationCheck: util.promisify(authyPhones.verification_check),
  verificationStart: (phoneNumber, phoneCountryCode, params) => {

    return authyVerificationStartPromisified(phoneNumber, phoneCountryCode, {...defaultVerificationStartParams, ...params});
  },
};
