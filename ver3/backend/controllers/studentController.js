const Student = require("../models/studentModel");

exports.getStudents = async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (error) {
        res.status(500).json({ error: "Error fetching students" });
    }
};
