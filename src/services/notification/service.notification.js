const notificationModel = require("../../model/notification/notification.model")
const createNotificationService = async (idUser, title, message, date) => {
  try {
    const newNotification = new notificationModel({ idUser, title, message, date })

    const createNotification = await newNotification.save()

    return { status: 200, message: "success created notification", data: createNotification }
  } catch (error) {
    throw new Error(error.message)
  }
}

const getNotificationByIdService = async (idUser) => {
  try {
    const notificationData = await notificationModel.find({ idUser });
    if (!notificationData) {
      throw new Error("Notification not found")
    }

    const data = notificationData.map(({ id, idUser, title, message, date }) => ({
      id,
      idUser,
      title,
      message,
      date
    }));

    return { status: 200, message: "success", data };
  } catch (error) {
    throw new Error(error.message);
  }
}

const getAllNotificationService = async (id, idUser, title, message, date, limit) => {
  try {
    const query = {};

    if (id) query._id = id;
    if (idUser) query.idUser = idUser;
    if (title) query.title = title;
    if (message) query.message = message;
    if (date) query.date = date;

    const notificationData = await notificationModel.find(query).limit(limit);

    const data = notificationData.map(({ id, idUser, title, message, date }) => ({
      id,
      idUser,
      title,
      message,
      date
    }));

    return { status: 200, message: "success", data };
  } catch (error) {
    throw new Error(error.message);
  }
}

const deleteNotificationByIdService = async (idUser) => {
  try {
    const notificationData = await notificationModel.find({ idUser });
    if (!notificationData) {
      throw new Error("Notification not found")
    }

    const deleteNotification = await notificationModel.deleteMany({ idUser });

    return { status: 200, message: "success", data: deleteNotification }
  } catch (error) {
    throw new Error(error.message)
  }
}

module.exports = {
  createNotificationService,
  getNotificationByIdService,
  getAllNotificationService,
  deleteNotificationByIdService
}