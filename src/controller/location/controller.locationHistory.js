const { getLocationHistoryByIdService, postLocationHistoryByIdService, deleteLocationHistoryByIdService } = require("../../services/location/service.locationHistory");

const postLocationHistoryById = async (req, res) => {
  try {
    const { idUser, latitude, longitude, accuracy, speed, timestamp } = req.body;
    const { idTicket } = req.params

    const editResult = await postLocationHistoryByIdService(idUser, idTicket, latitude, longitude, accuracy, speed, timestamp);

    res.status(200).json(editResult);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getLocationHistoryById = async (req, res) => {
  try {
    const { idUser, idTicket } = req.query

    const getResult = await getLocationHistoryByIdService(idUser, idTicket)

    res.status(200).json(getResult)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const deleteLocationHistoryById = async (req, res) => {
  try {
    const { idTicket } = req.params

    const deleteResult = await deleteLocationHistoryByIdService(idTicket)

    res.status(200).json(deleteResult)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = {
  postLocationHistoryById,
  getLocationHistoryById,
  deleteLocationHistoryById
}