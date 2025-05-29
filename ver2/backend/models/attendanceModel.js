const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
    studentName: String,
    month: String,
    year: Number,
    presentDays: Number,
    absentDays: Number,
    leaveDays: Number,
});

module.exports = mongoose.model("Attendance", attendanceSchema);
