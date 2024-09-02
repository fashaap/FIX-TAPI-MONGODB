const { createTicket, getTicketById, editTicketById, getAllTicket, deleteTicketById } = require("../../controller/ticket/controller.ticket");
const { verifyToken } = require("../../middleware/verifyToken");

const router = require("express").Router();

router.post("/create",  createTicket)
router.get("/:id", getTicketById)
router.put("/:id",  editTicketById)
router.get("/",  getAllTicket)
router.delete("/:id", verifyToken, deleteTicketById)

module.exports = router