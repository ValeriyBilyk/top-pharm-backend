const User = require('../../db/user');
const auth = require('../../auth');
const { getUserData } = require('../../lib/helpers/user');
const createError = require('http-errors');

module.exports = {
  signIn
};

async function signIn(req, res, next) {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return next(createError(401, 'User does not exist'));
    }
    if (await auth.crypt.verifyPassword(password, user.password)) {
      const accessToken = await auth.token.sign({ id: user._id });

      return res.send({ accessToken, userInfo: getUserData(user) });
    }

    next(createError(401, 'Unauthorized'));
  } catch (error) {
    next(error);
  }
}