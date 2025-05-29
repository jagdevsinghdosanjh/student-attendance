const express = require("express");
const { addAttendance, getAttendanceSummary } = require("../controllers/attendanceController");

const router = express.Router();

router.post("/addAttendance", addAttendance);
router.get("/attendanceSummary/:studentName/:year", getAttendanceSummary);

module.exports = router;
