const userService = require("../services/user");

async function usersPage(req, res) {
  try {
    const users = await userService.getAllUsers();
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
}

async function deleteUser(req, res) {

  try {
    const users = await userService.deleteUser(req.body.email_to_delete);
    res.status(200);
  } catch (error) {
    res.status(500).send(error);
  }
}

async function updateUserEmail(req, res) {

  try {
    const user = await userService.updateUserEmail(req.body.id, req.body.new_email);
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
}

async function addUser(req, res) {

  try {
    const users = await userService.addUser(req.body.email, req.body.first_name, req.body.last_name,req.body.is_admin);
    res.status(200);
  } catch (error) {
    res.status(500).send(error);
  }
}

async function getUserByEmail(req, res){

    try {
      const user = await userService.getUserByEmail(req.body.email);
      res.send(user);
      res.status(200);
    } catch (error) {
      res.status(500).send(error);
    }

}

async function getUserById(req, res){

  try {
    const user = await userService.getUserById(req.body.id);
    res.send(user);
    res.status(200);
  } catch (error) {
    res.status(500).send(error);
  }

}
module.exports = { usersPage, deleteUser, updateUserEmail, addUser, getUserByEmail, getUserById };
