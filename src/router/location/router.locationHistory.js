const { postLocationHistoryById, getLocationHistoryById, deleteLocationHistoryById } = require("../../controller/location/controller.locationHistory");

const router = require("express").Router();

router.post("/:idTicket", postLocationHistoryById)
router.get("/", getLocationHistoryById)
router.delete("/:idTicket", deleteLocationHistoryById)

module.exports = router