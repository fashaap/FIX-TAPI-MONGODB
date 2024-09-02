const { createNotificationService, getNotificationByIdService, getAllNotificationService, deleteNotificationByIdService } = require("../../services/notification/service.notification")

const createNotification = async (req, res) => {
  try {
    const { idUser, title, message, date } = req.body

    if (!idUser || !title || !message || !date) {
      return res.status(422).json({ error: "Please fill all the fields" })
    }

    const createResult = await createNotificationService(idUser, title, message, date)
    res.status(200).json(createResult)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const getNotificationById = async (req, res) => {
  try {
    const { idUser } = req.params

    if (!idUser) {
      throw new Error("idUser is required");
    }

    const getResult = await getNotificationByIdService(idUser)
    res.status(200).json(getResult)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const getAllNotification = async (req, res) => {
  try {
    const { id, idUSer, title, message, date, limit } = req.query

    const getAllResult = await getAllNotificationService(id, idUSer, title, message, date, limit)

    res.status(200).json(getAllResult)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const deleteNotificationById = async (req, res) => {
  try {
    const { idUser } = req.params

    const deleteResult = await deleteNotificationByIdService(idUser)

    res.status(200).json(deleteResult)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = {
  createNotification,
  getNotificationById,
  getAllNotification,
  deleteNotificationById
}