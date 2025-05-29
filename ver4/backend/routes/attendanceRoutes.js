// const express = require("express");
// const { markAttendance, getAttendanceSummary } = require("../controllers/attendanceController");

// const router = express.Router();

// router.post("/markAttendance", markAttendance);
// router.get("/attendanceSummary/:studentId", getAttendanceSummary);

// module.exports = router;

const express = require("express");
const { markAttendance, getAttendanceSummary } = require("../controllers/attendanceController");

const router = express.Router();

router.post("/markAttendance", markAttendance);
router.get("/attendanceSummary/:studentId", getAttendanceSummary);

module.exports = router;
