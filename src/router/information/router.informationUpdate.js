const { createInformationUpdate, getInformationUpdateById, getAllInformationUpdate, deleteInformationUpdateById } = require("../../controller/information/controller.informationUpdate");
const { verifyToken, verifyTokenAndAdmin } = require("../../middleware/verifyToken");
const router = require("express").Router();

router.post("/create", verifyToken, createInformationUpdate)
router.get("/:id", getInformationUpdateById)
router.get("/", getAllInformationUpdate)
router.delete("/:id",  deleteInformationUpdateById)

module.exports = router