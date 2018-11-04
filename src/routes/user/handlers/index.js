const createError = require('http-errors');
const User = require('../../../db/user');
const auth = require('../../../auth');

const userInfoProjection = { _id: 1, firstName: 1, lastName: 1, email: 1, username: 1, archives: 1 };

module.exports = {
  userListGET,
  userByIdGET,
  userPUT,
  userPOST,
  userDELETE,
  // userInfoGET,
};

async function userListGET (req, res, next) {
  // Format of sort params:
  // ?sort[]=name&sort[]=-propName
  const { sort } = req.query;

  const users = await User.getAllUsers(sort);

  res.send(users);
}

async function userByIdGET (req, res, next) {
  const { id } = req.params;
  try {
    const user = await User.findById(id);

    user ? res.send(user) : next();
  } catch (error) {
    next(error);
  }
}

async function userPUT (req, res, next) {
  const { id } = req.params;
  const { isAdmin, id: userId } = req.userData;
  if (!isAdmin && userId.toString() !== id) {
    return next(createError(403, 'Forbidden'));
  }
  try {
    const userData = req.body;
    const user = await User.findByIdAndUpdate(id, userData, { new: true });
    user ? res.send(user) : next();
  } catch (error) {
    next(error);
  }
}

async function userPOST (req, res, next) {
  try {
    const { username, password, confirmPassword } = req.body;

    if (!password) {

      return next(createError(400, 'Password is required'));
    }
    if (password.length < 6) {

      return next(createError(400, 'Password should have at least 6 characters'));
    }
    if (password !== confirmPassword) {

      return next(createError(400, 'Passwords don\'t match'));
    }

    await failIfUserExists(username);

    const userData = req.body;
    userData.password = await auth.crypt.encryptPassword(password);
    const user = await new User(userData).save();
    res.send(user);
  } catch (error) {
    next(error);
  }
}

async function userDELETE (req, res, next) {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndRemove(id);
    user ? res.status(204).end() : next();
  }
  catch (error) {
    next(error);
  }
}

// async function userInfoGET (req, res, next) {
//   const userId = req.userData.id;
//   const { deviceId } = req.query;
//   try {
//     const userData = (await User.findById(userId, userInfoProjection)).toObject();
//     const deviceData = deviceId ? (await Device.findOne({ deviceId: deviceId, user: userId })) : null;
//     userData.bookmarks = (await Bookmark.find({ user: userId }, { email: 1 })).map(({ email }) => email);
//     userData.notificationsEnabled = Boolean(deviceData && deviceData.token);
//     res.send(userData);
//   } catch (error) {
//     next(error);
//   }
// }

async function failIfUserExists(username) {

  if (!username) {
    throw createError(400, 'Username must be provided');
  }

  username = username && username.toLowerCase();

  const user = await User.findOne({username});

  if (user) {

    throw createError(409, username && user.username === username && 'Username already exists');
  }

}
