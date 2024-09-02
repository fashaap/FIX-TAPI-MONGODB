const informationUpdateModel = require("../../model/information/informationUpdate.model")

const createInformationUpdateService = async (title, description, image, version, date, device) => {
  try {
    const newInformationUpdate = new informationUpdateModel({
      title,
      description,
      image,
      version,
      date,
      device
    })
    const savedInformationUpdate = await newInformationUpdate.save()
    return { status: 200, message: "success created information update", data: savedInformationUpdate }
  } catch (error) {
    throw new Error(error.message)
  }
}

const getInformationUpdateByIdService = async (id) => {
  try {
    const informationUpdateData = await informationUpdateModel.find({ _id: id })
    if (!informationUpdateData) {
      throw new Error("information update not found")
    }
    return { status: 200, message: "success get information update", data: informationUpdateData }
  } catch (error) {
    throw new Error(error.message)
  }
}

const getAllInformationUpdateService = async (id, version, date, device) => {
  try {
    const query = {};

    if (id) query._id = id;
    if (version) query.version = version;
    if (date) query.date = date;
    if (device) query.device = device;

    const informationUpdateData = await informationUpdateModel.find(query)

    return { status: 200, message: "success get information update", data: informationUpdateData }
  } catch (error) {
    throw new Error(error.message)
  }
}

const deleteInformationUpdateByIdService = async (id, version, date, device) => {
  try {
    const query = {};
    if (id) query._id = id;
    if (version) query.version = version;
    if (date) query.date = date;
    if (device) query.device = device;
    const informationUpdateData = await informationUpdateModel.deleteOne(query)

    return { status: 200, message: "success delete information update", data: informationUpdateData }
  } catch (error) {
    throw new Error(error.message)
  }

}

module.exports = { createInformationUpdateService, getInformationUpdateByIdService, getAllInformationUpdateService, deleteInformationUpdateByIdService }