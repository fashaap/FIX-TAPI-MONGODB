const { createReportService, getReportByIdService, getAllReportService, deleteReportByIdService } = require("../../services/report/service.report")

const createReport = async (req, res) => {
  try {
    const { idUser, title, description } = req.body

    if (!idUser || !title || !description) {
      return res.status(422).json({ error: "Please fill all the fields" })
    }

    const createResult = await createReportService(idUser, title, description)
    res.status(200).json(createResult)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const getReportById = async (req, res) => {
  try {
    const { idUser } = req.params
    const getResult = await getReportByIdService(idUser)
    res.status(200).json(getResult)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const getAllReport = async (req, res) => {
  try {
    const { id, idUser } = req.query
    const getResult = await getAllReportService(id, idUser)
    res.status(200).json(getResult)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const deleteReportById = async (req, res) => {
  try {
    const { idUser } = req.params
    const deleteResult = await deleteReportByIdService(idUser)
    res.status(200).json(deleteResult)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}


module.exports = { createReport, getReportById, getAllReport, deleteReportById }