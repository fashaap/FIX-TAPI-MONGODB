const { createReport, getReportById, getAllReport, deleteReportById } = require("../../controller/report/controller.report");
const { verifyToken, verifyTokenAndAdmin } = require("../../middleware/verifyToken");
const router = require("express").Router();

router.post("/create", verifyToken, createReport)
router.get("/:idUser", getReportById)
router.get("/", getAllReport)
router.delete("/:idUser", verifyTokenAndAdmin, deleteReportById)

module.exports = router