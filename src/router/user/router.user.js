const { signUpUser, signInUser, getUserById, editUserById, getAllUser, deleteUserById } = require("../../controller/user/controller.user");
const { verifyTokenAndAdmin, verifyToken } = require("../../middleware/verifyToken");

const router = require("express").Router();

router.post("/signUp",  signUpUser);
router.post("/signIn", signInUser);

router.get("/:id", getUserById);
router.put("/:id", verifyToken, editUserById);
router.get("/",  getAllUser);
router.delete("/:id", verifyTokenAndAdmin, deleteUserById);

module.exports = router;
