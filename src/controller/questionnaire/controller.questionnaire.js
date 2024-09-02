const { createQuestionnaireService, getQuestionnaireByIdService, getAllQuestionnaireService, deleteQuestionnaireByIdService } = require("../../services/questionnaire/service.questionnaire")

const createQuestionnaire = async (req, res) => {
  try {
    const { idUser, answers } = req.body

    if (!idUser || !answers) {
      return res.status(422).json({ error: "Please fill all the fields" })
    }

    const createResult = await createQuestionnaireService(idUser, answers)

    res.status(200).json(createResult)
  } catch (error) {

    res.status(500).json({ error: error.message })
  }
}

const getQuestionnaireById = async (req, res) => {
  try {
    const { idUser } = req.params

    const getResult = await getQuestionnaireByIdService(idUser)

    res.status(200).json(getResult)
  } catch (error) {

    res.status(500).json({ error: error.message })
  }
}

const getAllQuestionnaire = async (req, res) => {
  try {
    const { id, idUser, answers, limit } = req.query

    const getResult = await getAllQuestionnaireService(id, idUser, answers, limit)

    res.status(200).json(getResult)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const deleteQuestionnaireById = async (req, res) => {
  try {
    const { idUser } = req.params

    const deleteResult = await deleteQuestionnaireByIdService(idUser)

    res.status(200).json(deleteResult)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = {
  createQuestionnaire,
  getQuestionnaireById,
  getAllQuestionnaire,
  deleteQuestionnaireById
}