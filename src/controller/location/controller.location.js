
const { editLocationByIdService, getLocationByIdService, getAllLocationService, deleteLocationUserByIdService } = require('../../services/location/service.location');

const editLocationById = async (req, res) => {
  try {
    const { idTicket, username, nisn, displayName, classGrade, latitude, longitude, timestamp, speed, accuracy } = req.body
    const { idUser } = req.params

    const editResult = await editLocationByIdService(idUser, idTicket, username, nisn,  displayName, classGrade, latitude, longitude, timestamp, speed, accuracy)

    res.status(200).json(editResult)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const getLocationById = async (req, res) => {
  try {
    const { idUser } = req.params

    const getResult = await getLocationByIdService(idUser)
    res.status(200).json(getResult)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const getAllLocation = async (req, res) => {
  try {
    const { idUser, idTicket, limit } = req.query

    const limitInt = parseInt(limit)

    const getAllResult = await getAllLocationService(idUser, idTicket, limitInt)

    res.status(200).json(getAllResult)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const deleteLocationById = async (req, res) => {
  try {
    const { idUser } = req.params

    const deleteResult = await deleteLocationUserByIdService(idUser)

    res.status(200).json(deleteResult)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = {
  editLocationById,
  getLocationById,
  getAllLocation,
  deleteLocationById
}

