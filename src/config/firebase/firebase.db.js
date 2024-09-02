const { initializeApp, cert } = require('firebase-admin/app');
const { getDatabase } = require('firebase-admin/database');
const credential = require("../firebase-credential/firebase.credential.json");

try {
  initializeApp({
    credential: cert(credential),
    databaseURL: 'https://opsi-2024-default-rtdb.asia-southeast1.firebasedatabase.app'
  });
} catch (error) {
  console.error('Error initializing Firebase:', error);
}
const dbRealtime = getDatabase();

module.exports = {
  dbRealtime
}