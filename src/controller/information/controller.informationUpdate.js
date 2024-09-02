const { createInformationUpdateService, getInformationUpdateByIdService, getAllInformationUpdateService, deleteInformationUpdateByIdService } = require("../../services/information/service.informationUpdate")


const createInformationUpdate = async (req, res) => {
  try {
    const { title, description, image, version, date, device } = req.body

    if (!title || !description || !image || !version || !date || !device) {
      return res.status(422).json({ error: "Please fill all the fields" })
    }

    const createInformationUpdateResult = await createInformationUpdateService(title, description, image, version, date, device)

    res.status(200).json(createInformationUpdateResult)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const getInformationUpdateById = async (req, res) => {
  try {
    const { id } = req.params

    const getInformationUpdateByIdResult = await getInformationUpdateByIdService(id)

    res.status(200).json(getInformationUpdateByIdResult)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const getAllInformationUpdate = async (req, res) => {
  try {
    const { id, version, date, device } = req.query

    const getAllInformationUpdateResult = await getAllInformationUpdateService(id, version, date, device)

    res.status(200).json(getAllInformationUpdateResult)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const deleteInformationUpdateById = async (req, res) => {
  try {
    const { id } = req.params
    const { version, date, device } = req.query

    const deleteInformationUpdateByIdResult = await deleteInformationUpdateByIdService(id, version, date, device)

    res.status(200).json(deleteInformationUpdateByIdResult)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = { createInformationUpdate, getInformationUpdateById, getAllInformationUpdate, deleteInformationUpdateById }