const registerModel = require("./model.register");
const brycpt = require("bcrypt");
const registerService = {};

registerService.add = async (name, email, mobile, password) => {
  const hash = brycpt.hashSync(password, 10);
  const register = await registerModel.create({
    name,
    email,
    mobile,
    password: hash,
  });
  return register;
};

registerService.findEmail = async (email) => {
  const registerEmail = await registerModel.findOne({ email });
  return registerEmail;
};

registerService.findMobile = async (mobile) => {
  const registerMobile = await registerModel.findOne({ mobile });
  return registerMobile;
};

registerService.singleUser = async (id) => {
  const singleUser = await registerModel.findById(id);
  return singleUser;
};

registerService.allUsers= async () => {
  const allUsers = await registerModel.find({});
  return allUsers;
};

registerService.updateUser = async (id, name, email, mobile) => {
  const updateUser = await registerModel.findByIdAndUpdate(
    id,
    { name, email, mobile },
    { new: true }
  );
  return updateUser;
};

registerService.deleteUser = async (id) => {
  const deleteUser = await registerModel.findByIdAndUpdate(id, {
    isDeleted: true,
  });
  return deleteUser;
};
module.exports = registerService;
