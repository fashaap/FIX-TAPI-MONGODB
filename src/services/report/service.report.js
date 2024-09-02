const reportModel = require("../../model/report/report.model");


const createReportService = async (idUser, title, description) => {
  try {
    const reportData = await reportModel.create({
      idUser, title, description, read: false, read: false, date: new Date().toLocaleDateString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }), pending: false
    });
    if (!reportData) {
      throw new Error("Report not created");
    }
    return { status: 200, message: "success create report", data: reportData };
  } catch (error) {
    throw new Error(error.message);
  }
}

const getReportByIdService = async (idUser) => {
  try {
    const reportData = await reportModel.find({ idUser });
    if (!reportData) {
      throw new Error("Report not found");
    }
    return { status: 200, message: "success get report", data: reportData };
  } catch (error) {
    throw new Error(error.message);
  }
}

const getAllReportService = async (id, idUser) => {
  try {
    const query = {};

    if (id) query._id = id;
    if (idUser) query.idUser = idUser;

    const getAllReportData = await reportModel.find(query)
    return { status: 200, message: "success get report", data: getAllReportData };
  } catch (error) {
    throw new Error(error.message);
  }
}

const deleteReportByIdService = async (idUser) => {
  try {
    const reportData = await reportModel.deleteMany({ idUser });
    if (!reportData) {
      throw new Error("Report not deleted");
    }
    return { status: 200, message: "success delete report", data: reportData };
  } catch (error) {
    throw new Error(error.message);
  }
}


module.exports = { createReportService, getReportByIdService, getAllReportService, deleteReportByIdService }