const { isValidEmail } = require("../../middleware/validationEmail");
const { signUpUserService, signInUserService, getUserByIdService, editUserByIdService, getAllUserService, deleteUserByIdService } = require("../../services/user/service.user");

const signUpUser = async (req, res) => {
  try {
    const { username, displayName, nisn, classGrade, email, password, code } = req.body;

    if (!username || !displayName || !nisn || !classGrade || !email || !password || !code) {
      return res.status(422).json({ error: "Please fill all the fields" });
    }
    

    if (!isValidEmail(email)) {
      return res.status(422).json({ error: "Please enter a valid email" });
    }

    const signUpResult = await signUpUserService(username, displayName, nisn, classGrade, email, password, code);

    res.status(200).json(signUpResult);
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const signInUser = async (req, res) => {
  try {
    const { username, nisn, email, password } = req.body;

    const singInResult = await signInUserService(username, nisn, email, password);

    res.status(200).json(singInResult);
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const getUserById = async (req, res) => {
  try {
    const { id } = req.params

    const getByIdResult = await getUserByIdService(id)

    res.status(200).json(getByIdResult)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const editUserById = async (req, res) => {
  try {
    const { username, displayName, displayImage, nisn, classGrade, email, password, role, code } = req.body
    const { id } = req.params

    const getByIdResult = await editUserByIdService(id, username, displayName, displayImage, nisn, classGrade, email, password, role, code)

    res.status(200).json(getByIdResult)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const getAllUser = async (req, res) => {
  try {
    const { id, username, displayName, nisn, classGrade, email, role, code, limit } = req.query;

    const getAllResult = await getAllUserService(id, username, displayName, nisn, classGrade, email, role, code, limit);

    res.status(200).json(getAllResult);
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const deleteUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const deleteResult = await deleteUserByIdService(id)

    res.status(200).json(deleteResult)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = {
  signUpUser,
  signInUser,
  getUserById,
  editUserById,
  getAllUser,
  deleteUserById
}