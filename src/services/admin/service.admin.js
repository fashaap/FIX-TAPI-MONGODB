const { hashPassword, comparePassword } = require("../../middleware/bcrypt");
const generateTokens = require("../../middleware/JwtToken");
const userAdminModel = require("../../model/admin/userAdmin.Model");
const userRole = require("../../json/userRole.json")

const signUpAdminService = async (username, displayName, email, password, role, code) => {
  try {
    const hashedPassword = await hashPassword(password, 10);

    const newUser = new userAdminModel({
      username,
      displayName,
      displayImage: "https://fastly.picsum.photos/id/12/2500/1667.jpg",
      email,
      password: hashedPassword,
      role,
      code
    });

    const userAdminData = await userAdminModel.findOne({ email });

    if (userAdminData) {
      throw new Error("A user with the same email already exists");
    }

    const savedUser = await newUser.save();
    return { status: 200, message: "Registration successful", data: savedUser };
  } catch (error) {
    throw new Error(error.message);
  }
};

const signInAdminService = async (username, email, password) => {
  try {
    const userQuery = username ? { username } : email ? { email } : {};
    const userAdminData = await userAdminModel.findOne(userQuery);

    if (!userAdminData) {
      throw new Error("Invalid credentials");
    }

    const passwordMatch = await comparePassword(password, userAdminData.password);

    if (!passwordMatch) {
      throw new Error("Invalid password");
    }

    const data = {
      _id: userAdminData._id,
      username: userAdminData.username,
      email: userAdminData.email,
      role: userAdminData.role,
    };

    const token = generateTokens(data);

    return { status: 200, message: "Success", token };
  } catch (error) {
    throw new Error(error.message);
  }
}

const getAdminByIdService = async (id) => {
  try {
    const userAdminData = await userAdminModel.findById(id);
    if (!userAdminData) {
      throw new Error("User not found");
    }

    const data = {
      _id: userAdminData._id,
      username: userAdminData.username,
      displayName: userAdminData.displayName,
      displayImage: userAdminData.displayImage,
      email: userAdminData.email,
      role: userAdminData.role,
      code: userAdminData.code,
    };

    return { status: 200, message: "success", data };
  } catch (error) {
    throw new Error(error.message);
  }
};

const editAdminByIdService = async (id, username, displayName, displayImage, email, role, code) => {
  try {
    const userAdminData = await userAdminModel.findById(id);
    if (!userAdminData) {
      throw new Error("User not found");
    }

    const updatedAdmin = await userAdminModel.findByIdAndUpdate(
      id,
      {
        username,
        displayName,
        displayImage,
        email,
        role,
        code,
      },
      { new: true }
    );

    const updatedAdminData = {
      _id: updatedAdmin._id,
      username: updatedAdmin.username,
      displayName: updatedAdmin.displayName,
      displayImage: updatedAdmin.displayImage,
      email: updatedAdmin.email,
      role: updatedAdmin.role,
      code: updatedAdmin.code,
    };

    return { status: 200, message: "User updated successfully", data: updatedAdminData };
  } catch (error) {
    throw new Error(error.message);
  }
}

const getAllAdminService = async (id, username, displayName, email, role, code, limit) => {
  try {
    const query = {};

    if (id) query._id = id;
    if (username) query.username = username;
    if (displayName) query.displayName = displayName;
    if (email) query.email = email;
    if (role) query.role = role;
    if (code) query.code = code;

    const userAdminData = await userAdminModel.find(query).limit(limit);

    const data = userAdminData.map(({ id, username, displayName, displayImage, email, role, code }) => ({
      id,
      username,
      displayName,
      displayImage,
      email,
      role,
      code,
    }));

    return { status: 200, message: "success", data };
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteAdminByIdService = async (id) => {
  try {
    const userAdminData = await userAdminModel.findById(id);
    if (!userAdminData) {
      throw new Error("User not found")
    }

    const deleteUserAdmin = await userAdminModel.findByIdAndDelete(id);

    return { status: 200, message: "User deleted", data: deleteUserAdmin };
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = {
  signUpAdminService,
  signInAdminService,
  getAdminByIdService,
  editAdminByIdService,
  getAllAdminService,
  deleteAdminByIdService
};
