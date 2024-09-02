const { createTicketService, getTicketByIdService, editTicketByIdService, getAllTicketService, deleteTicketByIdService } = require("../../services/ticket/service.ticket");


const createTicket = async (req, res) => {
  try {
    const { idUser, username, nisn, classGrade, email, TimeCountdown, startTime, endTime, category, subjects, description, date, image } = req.body

    if (!idUser || !username || !nisn || !classGrade || !email || !TimeCountdown || !startTime || !endTime || !category || !subjects || !description || !date) {
      return res.status(422).json({ error: "Please fill all the fields" });
    }

    const createTicketResult = await createTicketService(idUser, username, nisn, classGrade, email, TimeCountdown, startTime, endTime, category, subjects, description, date, image)

    res.status(200).json(createTicketResult)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const getTicketById = async (req, res) => {
  try {
    const { id } = req.params

    const getByIdResult = await getTicketByIdService(id)

    res.status(200).json(getByIdResult)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const editTicketById = async (req, res) => {
  try {
    const { TimeCountdown, category, subjects, description, codeStatus, date, expired, time } = req.body
    const { id } = req.params

    const getByIdResult = await editTicketByIdService(id, TimeCountdown, category, subjects, description, codeStatus, date, expired, time)

    res.status(200).json(getByIdResult)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const getAllTicket = async (req, res) => {
  try {
    const { idUser, id, username, nisn, classGrade, email, category, codeStatus, date, expired, limit } = req.query
    const getAllResult = await getAllTicketService(idUser, id, username, nisn, classGrade, email, category, codeStatus, date, expired, limit)

    res.status(200).json(getAllResult)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const deleteTicketById = async (req, res) => {
  try {
    const { id } = req.params

    const deleteResult = await deleteTicketByIdService(id)

    res.status(200).json(deleteResult)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = {
  createTicket,
  getTicketById,
  editTicketById,
  getAllTicket,
  deleteTicketById
}