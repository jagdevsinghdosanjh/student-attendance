// backend/routes/monthlyAttendanceRoutes.js

const express = require("express");
const { getMonthlyAttendance } = require("../controllers/monthlyAttendanceController");

const router = express.Router();

router.get("/monthlyAttendance", getMonthlyAttendance);

module.exports = router;
