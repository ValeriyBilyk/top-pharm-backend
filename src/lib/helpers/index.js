const { USER_INBOX_DOMAIN, PREVIEW_INBOX_DOMAIN } = process.env;

module.exports = {
  escapeRegExp,
  pickObjProps,
  isUserEmailAddress,
  isPreviewAddress
};

function escapeRegExp(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

function pickObjProps(obj, props) {

  return props.reduce((result, prop) => obj[prop] === undefined ? result : Object.assign(result, {[prop]: obj[prop]}), {});
}

function isUserEmailAddress(emailAddress) {
  return emailAddress.endsWith(`@${USER_INBOX_DOMAIN}`);
}

function isPreviewAddress(emailAddress) {

  return emailAddress.endsWith(`@${PREVIEW_INBOX_DOMAIN}`);
}