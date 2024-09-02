const ticketModel = require("../../model/ticket/ticket.model");
const statusCode = require("../../json/statusCode.json")

const createTicketService = async (idUser, username, nisn, classGrade, email, TimeCountdown, startTime, endTime, category, subjects, description, date) => {
  try {
    const newTicket = new ticketModel({
      idUser,
      username,
      nisn,
      classGrade,
      email,
      TimeCountdown,
      startTime,
      endTime,
      category,
      subjects,
      description,
      codeStatus: statusCode.verification_admin, // Ensure `statusCode` is defined or imported correctly
      date,
      image: "https://via.placeholder.com/300", // Default or placeholder image
      expired: false,
    });

    const savedTicket = await newTicket.save();
    return { status: 200, message: "Ticket created successfully", data: savedTicket };
  } catch (error) {
    throw new Error(error.message);
  }
}


const getTicketByIdService = async (id) => {
  try {
    const ticketData = await ticketModel.findById(id);
    if (!ticketData) {
      throw new Error("Ticket not found");
    }

    return { status: 200, message: "success get ticket", data: ticketData }
  } catch (error) {
    throw new Error(error.message);
  }
}

const editTicketByIdService = async (id, TimeCountdown, category, subjects, description, codeStatus, date, expired, time) => {
  try {

    const ticketData = await ticketModel.findById(id);
    if (!ticketData) {
      throw new Error("Ticket not found");
    }

    const updatedTicket = await ticketModel.findByIdAndUpdate(
      id,
      {
        TimeCountdown,
        category,
        subjects,
        description,
        codeStatus,
        date,
        expired,
        time
      },
      { new: true }
    );

    return { status: 200, message: "success updated ticket", data: updatedTicket }
  } catch (error) {
    throw new Error(error.message);
  }
}

const getAllTicketService = async (idUser, id, username, nisn, classGrade, email, category, codeStatus, date, expired, limit) => {
  try {
    const query = {};

    if (idUser) query.idUser = idUser;
    if (id) query._id = id;
    if (username) query.username = username;
    if (nisn) query.nisn = nisn;
    if (classGrade) query.classGrade = classGrade;
    if (email) query.email = email;
    if (category) query.category = category;
    if (codeStatus) query.codeStatus = codeStatus;
    if (date) query.date = date;
    if (expired) query.expired = expired;

    const ticketData = await ticketModel.find(query).limit(limit);

    return { status: 200, message: "success", data: ticketData }
  } catch (error) {
    throw new Error(error.message);
  }
}

const deleteTicketByIdService = async (idTicket) => {
  try {

    const ticketData = await ticketModel.findById(idTicket);
    if (!ticketData) {
      throw new Error("Ticket not found");
    }

    const deleteTicket = await ticketModel.findByIdAndDelete(idTicket);
    return { status: 200, message: "success deleted ticket", data: deleteTicket }
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = {
  createTicketService,
  getTicketByIdService,
  editTicketByIdService,
  getAllTicketService,
  deleteTicketByIdService
}