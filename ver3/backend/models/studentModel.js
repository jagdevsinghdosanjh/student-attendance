const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    name: String,
    rollNumber: String,
    class: String,
    session: String,
});

module.exports = mongoose.model("Student", studentSchema);
