const locationHistoryModel = require("../../model/location/locationHistory.model")

const postLocationHistoryByIdService = async (idUser, idTicket, latitude, longitude, accuracy, speed, timestamp) => {
  try {

    if (!idUser || !idTicket || !latitude || !longitude || !accuracy || !speed || !timestamp) {
      throw new Error("Missing required parameters")
    }

    const newLocationHistory = new locationHistoryModel({
      idUser,
      idTicket,
      latitude,
      longitude,
      accuracy,
      speed,
      timestamp,
    });

    const postResult = await newLocationHistory.save()

    return { status: 200, message: "Success", data: postResult }
  } catch (error) {
    throw new Error(error.message)
  }
}

const getLocationHistoryByIdService = async (idUser, idTicket) => {
  try {
    const query = {};

    if (idUser) query.idUser = idUser
    if (idTicket) query.idTicket = idTicket

    const locationHistory = await locationHistoryModel.find(query)

    if (!locationHistory) {
      throw new Error("No location history found")
    }

    const data = locationHistory.map(({ _id, idUser, idTicket, latitude, longitude, accuracy, speed, timestamp }) => ({
      _id,
      idUser,
      idTicket,
      latitude,
      longitude,
      accuracy,
      speed,
      timestamp
    }))

    return { status: 200, message: "success get location history", data }
  } catch (error) {
    throw new Error(error.message)
  }
}

const deleteLocationHistoryByIdService = async (idTicket) => {
  try {
    if (!idTicket) {
      throw new Error("Missing required parameters")
    }

    const deleteResult = await locationHistoryModel.deleteMany({ idTicket })

    return { status: 200, message: "Success", data: deleteResult }
  } catch (error) {
    throw new Error(error.message)
  }
}

module.exports = {
  postLocationHistoryByIdService,
  getLocationHistoryByIdService,
  deleteLocationHistoryByIdService
}