const User = require("../models/user");

async function getUser(userId) {
  const user = await User.findOne({ _id: userId });
  return user;
}
async function getAllUsers() {
  const user = await User.find({});
  return user;
}

async function deleteUser(email) {
  const user = await User.deleteOne({ email: email });
}

async function updateUserEmail(id, new_email) {
  console.log("Inside update user service");
  console.log(id);
  console.log(new_email);

  const filter = { _id: id };
  const update = { email: new_email };
  const user = await User.findOneAndUpdate(filter, update);
  const updatedUser = await getUser(id);
  return updatedUser;
}

async function addUser(email, first_name, last_name, is_admin) {
  const user = new User({
    email: email,
    first_name: first_name,
    last_name: last_name,
    is_admin: is_admin,
  });
  await user.save();
}

async function getUserByEmail(email) {
  const user = await User.findOne({ email: email });
  return user;
}

async function getUserById(id) {
  const user = await User.findOne({ _id: id });
  return user;
}

module.exports = {
  getAllUsers,
  deleteUser,
  updateUserEmail,
  addUser,
  getUserByEmail,
  getUserById,
};
