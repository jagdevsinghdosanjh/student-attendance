const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    studentId: { type: String, unique: true, required: true }, // Unique Student ID
    name: String,
    fatherName: String,
    motherName: String,
    dob: String,
    gender: String,
    class: String,
    section: String,
    mobileNumber: String,
});

module.exports = mongoose.model("Student", studentSchema);
