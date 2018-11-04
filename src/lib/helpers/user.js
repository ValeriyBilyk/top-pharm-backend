module.exports = {
  getUserData
};

function getUserData(user) {

  return {
    id: user._id,
    username: user.username,
    isAdmin: user.role === 'admin'
  };
}