const { createNotification, getNotificationById, getAllNotification, deleteNotificationById } = require("../../controller/notification/controller.notification");
const { verifyTokenAndAdmin, verifyToken } = require("../../middleware/verifyToken");

const router = require("express").Router();

router.post("/create",  createNotification)
router.get("/:idUser", verifyToken, getNotificationById)
router.get("/", getAllNotification)
router.delete("/:idUser", verifyToken, deleteNotificationById)

module.exports = router