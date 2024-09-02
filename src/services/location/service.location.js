const { dbRealtime } = require('../../config/firebase/firebase.db');

const editLocationByIdService = async (idUser, idTicket, username, nisn, displayName, classGrade, latitude, longitude, timestamp, speed, accuracy) => {
  try {
    if (latitude === undefined || longitude === undefined || timestamp === undefined || speed === undefined || accuracy === undefined) {
      throw new Error('Missing required parameters');
    }

    const query = dbRealtime.ref(`location/${idUser}`);

    query.set({
      idUser,
      idTicket,
      username,
      nisn,
      displayName,
      classGrade,
      latitude,
      longitude,
      timestamp,
      speed,
      accuracy
    })

    const snapshot = await query.once('value');

    const data = snapshot.val();
    return { status: 200, message: "Success", data };
  } catch (error) {
    throw new Error(error.message);
  }
}

const getLocationByIdService = async (idUser) => {
  try {
    const query = dbRealtime.ref("location/" + idUser)

    const snapshot = await query.once('value');

    const data = snapshot.val();

    return { status: 200, message: "Success", data };
  } catch (error) {
    throw new Error(error.message);
  }
}

const getAllLocationService = async (idUser, idTicket, limit) => {
  try {
    let query = dbRealtime.ref("location");

    if (idUser) {
      query = query.orderByChild("idUser").equalTo(idUser);
    }

    if (idTicket) {
      query = query.orderByChild("idTicket").equalTo(idTicket);
    }

    if (limit) {
      query = query.limitToFirst(limit);
    }

    const snapshot = await query.once('value');
    const data = snapshot.val();

    return { status: 200, message: "success", data };
  } catch (error) {
    throw new Error(`Failed to retrieve locations: ${error.message}`);
  }
};

const deleteLocationUserByIdService = async (idUser) => {
  try {
    const query = dbRealtime.ref("location/" + idUser)

    await query.remove();

    return { status: 200, message: "deleted " };
  } catch (error) {
    throw new Error(error.message);
  }
}


module.exports = {
  editLocationByIdService,
  getLocationByIdService,
  getAllLocationService,
  deleteLocationUserByIdService
}
