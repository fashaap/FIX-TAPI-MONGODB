const questionnaireModel = require("../../model/questionnaire/questionnaire.model")

const createQuestionnaireService = async (idUser, answers) => {
  try {
    const newQuestionnaire = new questionnaireModel({
      idUser,
      answers
    })

    const createQuestionnaire = await newQuestionnaire.save()

    return { status: 200, message: "success created questionnaire", data: createQuestionnaire }
  } catch (error) {
    throw new Error(error.message)
  }
}

const getQuestionnaireByIdService = async (idUser) => {
  try {
    const getQuestionnaire = await questionnaireModel.find({ idUser })

    if (!getQuestionnaire) {
      throw new Error("Questionnaire not found")
    }

    const data = getQuestionnaire.map(({ id, idUser, answers }) => ({
      id,
      idUser,
      answers
    }))

    return { status: 200, message: "success", data }
  } catch (error) {
    throw new Error(error.message)
  }
}

const getAllQuestionnaireService = async (id, idUser, answers, limit) => {
  try {
    const query = {};

    if (id) query._id = id;
    if (idUser) query.idUser = idUser;
    if (answers) query.answers = answers

    const getQuestionnaire = await questionnaireModel.find(query).limit(limit)


    return { status: 200, message: "success", data: getQuestionnaire }
  } catch (error) {
    throw new Error(error.message)
  }
}

const deleteQuestionnaireByIdService = async (idUser) => {
  try {
    const questionnaire = await questionnaireModel.find({ idUser })
    if (!questionnaire) {
      throw new Error("Questionnaire not found")
    }

    const deleteQuestionnaire = await questionnaireModel.deleteMany({ idUser })

    return { status: 200, message: "success", data: deleteQuestionnaire }
  } catch (error) {
    throw new Error(error.message)
  }
}

module.exports = {
  createQuestionnaireService,
  getQuestionnaireByIdService,
  getAllQuestionnaireService,
  deleteQuestionnaireByIdService
}