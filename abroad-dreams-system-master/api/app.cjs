const express = require("express");
const admin = require("firebase-admin");
const cors = require("cors");
var crypto = require("crypto");
const credentials = require("./key.json");

// Databases: student_active, student_pending, counselor, admin, courses, degree_programs

admin.initializeApp({
  credential: admin.credential.cert(credentials),
});
const db = admin.firestore();

const app = express();
app.use(cors());



const server = app.listen(process.env.PORT || 8080, () => {
  console.log("http://localhost:8080/");
});
