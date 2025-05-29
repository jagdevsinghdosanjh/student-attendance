const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
    studentId: mongoose.Schema.Types.ObjectId,
    date: String,
    status: { type: String, enum: ["Present", "Absent", "Leave"], default: "Present" }
});

module.exports = mongoose.model("Attendance", attendanceSchema);
