const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
    studentId: { type: String, ref: "Student", required: true }, // Foreign Key
    date: String,
    status: { type: String, enum: ["Present", "Absent", "Leave"], default: "Present" }
});

module.exports = mongoose.model("Attendance", attendanceSchema);
