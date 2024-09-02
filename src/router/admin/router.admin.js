const { signUpAdmin, signInAdmin, getAdminById, editAdminById, getAllAdmin, deleteAdminById } = require("../../controller/admin/controller.admin");
const { verifyTokenAndAdmin, verifyTokenAndSuperAdmin } = require("../../middleware/verifyToken");

const router = require("express").Router();

router.post("/signUp", verifyTokenAndSuperAdmin, signUpAdmin)
router.post("/signIn", signInAdmin)

router.get("/:id", verifyTokenAndAdmin, getAdminById)
router.put("/:id", verifyTokenAndAdmin, editAdminById)
router.get("/", verifyTokenAndAdmin, getAllAdmin)
router.delete("/:id", verifyTokenAndSuperAdmin, deleteAdminById)

module.exports = router