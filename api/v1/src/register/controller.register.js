const registerService = require("./service.register");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const registerController = {};

registerController.add = async (req, res) => {
  try {
    const { name, email, mobile, password, confirmPassword } = req.body;

    if (!name || !email || !mobile || !password || !confirmPassword) {
      return res.send({
        status: false,
        message: "Please fill all the fields",
        data: null,
      });
    }

    if (password !== confirmPassword) {
      return res.send({
        status: false,
        message: "Password and Confirm Password do not match",
        data: null,
      });
    }

    const registerEmail = await registerService.findEmail(email);

    if (registerEmail) {
      return res.send({
        status: false,
        message: "Email already exists",
        data: null,
      });
    }

    const registerMobile = await registerService.findMobile(mobile);

    if (registerMobile) {
      return res.send({
        status: false,
        message: "Mobile already exists",
        data: null,
      });
    }

    const register = await registerService.add(name, email, mobile, password);

    if (!register) {
      return res.send({
        status: false,
        message: "Failed to register",
        data: null,
      });
    }

    return res.send({
      status: true,
      message: "Register successfully",
      data: register,
    });
  } catch (error) {
    return res.send({
      status: false,
      message: "something went wrong to add register",
      data: null,
    });
  }
};

registerController.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.send({
        status: false,
        message: "Please fill the mantion field",
        data: null,
      });
    }

    const registeredEmail = await registerService.findEmail(email);

    if (!registeredEmail) {
      return res.send({
        status: false,
        message: "Email not found",
        data: null,
      });
    }

    const matchedPassword = bcrypt.compareSync(
      password,
      registeredEmail.password
    );

    if (!matchedPassword) {
      return res.send({
        status: false,
        massage: "Password not matched",
        data: null,
      });
    }

    const token = jwt.sign(
      { _id: registeredEmail._id },
      process.env.JWT_SECRET
    );

    return res.send({
      status: true,
      message: "Login Successfully",
      data: token,
    });
  } catch (error) {
    return res.send({
      status: false,
      message: "Something went wrong to login",
      data: null,
    });
  }
};

registerController.singleUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (id) {
      const singleUser = await registerService.singleUser(id);
      if (!singleUser) {
        return res.send({
          status: false,
          message: "Single User not found",
          data: null,
        });
      }
      return res.send({
        status: true,
        mesaage: "Single user found successfully",
        data: singleUser,
      });
    }
  } catch (error) {
    return res.send({
      status: false,
      message: "Something went wrong to get single user",
      data: null,
    });
  }
};

registerController.allUsers = async (req, res) => {
  try {
    const users = await registerService.allUsers();

    if (users) {
      return res.send({
        status: true,
        message: "All user found successfully",
        data: users,
      });
    }
  } catch (error) {
    return res.send({
      status: false,
      message: "Something went wrong to get all users",
      data: null,
    });
  }
};

registerController.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, mobile } = req.body;

    if (id && name && email && mobile) {
      const updatedUser = await registerService.updateUser(
        id,
        name,
        email,
        mobile
      );

      if (updatedUser) {
        return res.send({
          status: true,
          message: "User updated successfully",
          data: updatedUser,
        });
      }
    }
  } catch (error) {
    return res.send({
      status: false,
      message: "Something went wrong to update user",
      data: null,
    });
  }
};

registerController.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (id) {
      const deletedUser = await registerService.deleteUser(id);
      if (deletedUser) {
        return res.send({
          status: true,
          message: "User deleted successfully",
          data: deletedUser,
        });
      }
    }
  } catch (error) {
    return res.send({
      status: false,
      message: "Something went wrong to delete user",
      data: null,
    });
  }
};
module.exports = registerController;
