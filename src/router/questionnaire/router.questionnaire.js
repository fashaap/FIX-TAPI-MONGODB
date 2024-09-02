const { createQuestionnaire, getQuestionnaireById, getAllQuestionnaire, deleteQuestionnaireById } = require("../../controller/questionnaire/controller.questionnaire");
const { verifyToken, verifyTokenAndAdmin } = require("../../middleware/verifyToken");

const router = require("express").Router();

router.post("/create", verifyToken, createQuestionnaire)
router.get("/:idUser",  getQuestionnaireById)
router.get("/", getAllQuestionnaire)
router.delete("/:idUser", verifyTokenAndAdmin, deleteQuestionnaireById)

module.exports = router