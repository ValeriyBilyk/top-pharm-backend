const router = require('express').Router();
const user = require('./handlers');

router.post('/sign-in', user.signIn);

module.exports = router;