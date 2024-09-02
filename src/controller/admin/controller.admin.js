const { isValidEmail } = require("../../middleware/validationEmail");
const { signUpAdminService, signInAdminService, getAdminByIdService, editAdminByIdService, getAllAdminService, deleteAdminByIdService } = require("../../services/admin/service.admin");


const signUpAdmin = async (req, res) => {
  try {
    const { username, displayName, email, password, role, code } = req.body;

    if (!username || !displayName || !email || !password || !role || !code) {
      return res.status(422).json({ error: "Please fill all the fields" });
    }

    if (!isValidEmail(email)) {
      return res.status(422).json({ error: "Please enter a valid email" });
    }

    const signUpResult = await signUpAdminService(username, displayName, email, password, role, code);

    res.status(200).json(signUpResult);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

const signInAdmin = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const singInResult = await signInAdminService(username, email, password);

    res.status(200).json(singInResult);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const getAdminById = async (req, res) => {
  try {
    const { id } = req.params

    const getByIdResult = await getAdminByIdService(id);

    res.status(200).json(getByIdResult)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const editAdminById = async (req, res) => {
  try {
    const { username, displayName, displayImage, email, role, code } = req.body
    const { id } = req.params

    const getByIdResult = await editAdminByIdService(id, username, displayName, displayImage, email, role, code)

    res.status(200).json(getByIdResult)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const getAllAdmin = async (req, res) => {
  try {
    const { id, username, displayName, email, role, code, limit } = req.query;

    const getAllResult = await getAllAdminService(id, username, displayName, email, role, code, limit);

    res.status(200).json(getAllResult);
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const deleteAdminById = async (req, res) => {
  try {
    const { id } = req.params;

    const deleteResult = await deleteAdminByIdService(id);

    res.status(200).json(deleteResult)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = {
  signUpAdmin,
  signInAdmin,
  getAdminById,
  editAdminById,
  getAllAdmin,
  deleteAdminById
}