const router = require('express').Router();
const user = require('./handlers');

router.post('/sign-in', user.signIn);

router.post('/sign-up', user.signUp);

module.exports = router;