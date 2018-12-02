const User = require('../../db/user');
const auth = require('../../auth');
const { getUserData } = require('../../lib/helpers/user');
const createError = require('http-errors');

module.exports = {
  signIn,
  signUp
};

async function signIn(req, res, next) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

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

async function signUp(req, res, next) {
  try {
    const { email, password, confirmPassword } = req.body;

    if (!password) {

      return next(createError(400, 'Password is required'));
    }
    if (password.length < 6) {

      return next(createError(400, 'Password should have at least 6 characters'));
    }
    if (password !== confirmPassword) {

      return next(createError(400, 'Passwords don\'t match'));
    }

    if (await User.findOne({ email })) {
      return next(createError(401, 'User already exists'));
    }

    const user = await new User({ email, password: await auth.crypt.encryptPassword(password) }).save();

    const accessToken = await auth.token.sign({ id: user._id });

    res.send({ accessToken, userInfo: getUserData(user) });
  } catch (error) {
    next(error);
  }
}