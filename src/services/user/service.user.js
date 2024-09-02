const { hashPassword, comparePassword } = require("../../middleware/bcrypt");
const userModel = require("../../model/user/user.Model");

const userRole = require("../../json/userRole.json");
const generateTokens = require("../../middleware/JwtToken");

const signUpUserService = async (username, displayName, nisn, classGrade, email, password, code) => {
  try {
    const hashedPassword = await hashPassword(password, 10);


    const newUser = new userModel({
      username,
      displayName,
      displayImage: "https://fastly.picsum.photos/id/12/2500/1667.jpg",
      nisn,
      classGrade,
      email,
      password: hashedPassword,
      role: userRole.user,
      code
    })

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      throw new Error("A user with the same email already exists");
    }

    const existingUserByNisn = await userModel.findOne({ nisn });
    if (existingUserByNisn) {
      throw new Error("A user with the same NISN already exists");
    }

    const savedUser = await newUser.save();
    return { status: 200, message: "Registration successful", data: savedUser };
  } catch (error) {
    throw new Error(error.message);
  }
}

const signInUserService = async (username, nisn, email, password) => {
  try {
    const userQuery = username ? { username } : nisn ? { nisn } : email ? { email } : null;
    const userData = await userModel.findOne(userQuery);

    if (!userData) {
      throw new Error("Invalid credentials");
    }

    const passwordMatch = await comparePassword(password, userData.password);

    if (!passwordMatch) {
      throw new Error("Invalid password");
    }

    const data = {
      _id: userData._id,
      username: userData.username,
      nisn: userData.nisn,
      email: userData.email,
      role: userData.role,
    };

    const token = generateTokens(data);

    return { status: 200, message: "success", token };
  } catch (error) {
    throw new Error(error.message);
  }
}

const getUserByIdService = async (id) => {
  try {
    const userData = await userModel.findById(id);
    if (!userData) {
      throw new Error("User not found")
    }

    const data = {
      _id: userData._id,
      username: userData.username,
      displayName: userData.displayName,
      displayImage: userData.displayImage,
      classGrade: userData.classGrade,
      nisn: userData.nisn,
      email: userData.email,
      role: userData.role,
      code: userData.code
    }

    return { status: 200, message: "success", data }
  } catch (error) {
    throw new Error(error.message)
  }
}

const editUserByIdService = async (id, username, displayName, displayImage, nisn, classGrade, email, password, role, code) => {
  try {
    const userData = await userModel.findById(id);
    if (!userData) {
      throw new Error("User not found")
    }

    const updatedUser = await userModel.findByIdAndUpdate(
      id,
      {
        username,
        displayName,
        displayImage,
        nisn,
        classGrade,
        email,
        password,
        role,
        code
      },
      { new: true }
    );

    const updateUserData = {
      _id: updatedUser._id,
      username: updatedUser.username,
      displayName: updatedUser.displayName,
      displayImage: updatedUser.displayImage,
      nisn: updatedUser.nisn,
      classGrade: updatedUser.classGrade,
      email: updatedUser.email,
      role: updatedUser.role,
      code: updatedUser.code
    }

    return { status: 200, message: "success", data: updateUserData }
  } catch (error) {
    throw new Error(error.message)
  }
}

const getAllUserService = async (id, username, displayName, nisn, classGrade, email, role, code, limit) => {
  try {
    const query = {};

    if (id) query._id = id;
    if (username) query.username = username;
    if (displayName) query.displayName = displayName;
    if (nisn) query.nisn = nisn;
    if (classGrade) query.classGrade = classGrade;
    if (email) query.email = email;
    if (role) query.role = role;
    if (code) query.code = code;

    const userData = await userModel.find(query).limit(limit);

    const data = userData.map(({ id, username, displayName, displayImage, nisn, classGrade, email, role, code }) => ({
      id,
      username,
      displayName,
      displayImage,
      nisn,
      classGrade,
      email,
      role,
      code
    }))

    return { status: 200, message: "success", data }
  } catch (error) {
    throw new Error(error.message)
  }
}

const deleteUserByIdService = async (id) => {
  try {
    const userData = await userModel.findById(id);
    if (!userData) {
      throw new Error("User not found")
    }

    const deleteUser = await userModel.findByIdAndDelete(id);

    return { status: 200, message: "user deleted", data: deleteUser }
  } catch (error) {
    throw new Error(error.message)
  }
}

module.exports = {
  signUpUserService,
  signInUserService,
  getUserByIdService,
  editUserByIdService,
  getAllUserService,
  deleteUserByIdService
}