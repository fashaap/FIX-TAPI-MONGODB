const { editLocationById, getLocationById, getAllLocation, deleteLocationById, } = require("../../controller/location/controller.location");
const { verifyToken, verifyTokenAndViewer, verifyTokenAndAdmin } = require("../../middleware/verifyToken");

const router = require("express").Router();

router.put("/:idUser",  editLocationById)
router.get("/:idUser", getLocationById)
router.get("/",  getAllLocation)
router.delete("/:idUser", verifyTokenAndAdmin, deleteLocationById)

module.exports = router