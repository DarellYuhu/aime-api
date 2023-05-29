const {
  createUser,
  getUser,
  getAllUsers,
  updateUser,
  deleteUser,
} = require("../services/user.service");

exports.create = async (req, res) => {
  const userData = req.body;
  const result = await createUser(userData);
  res.send(result);
};

exports.get = async (req, res) => {
  const uuid = req.params.uuid;
  const result = await getUser(uuid);
  res.send(result);
};

exports.getAll = async (req, res) => {
  const result = await getAllUsers();
  res.send(result);
};

exports.update = async (req, res) => {
  const uuid = req.params.uuid;
  const userData = req.body;
  const result = await updateUser(uuid, userData);
  res.send(result);
};

exports.delete = async (req, res) => {
  const uuid = req.params.uuid;
  const result = await deleteUser(uuid);
  res.send(result);
};
