const Student = require("../models/studentModel");

exports.registerStudent = async (req, res) => {
    try {
        const { studentId, name, fatherName, motherName, dob, gender, class: studentClass, section, mobileNumber } = req.body;

        // Check if student already exists
        const existingStudent = await Student.findOne({ studentId });
        if (existingStudent) {
            return res.status(400).json({ error: "Student ID already exists!" });
        }

        const newStudent = new Student({ studentId, name, fatherName, motherName, dob, gender, studentClass, section, mobileNumber });
        await newStudent.save();
        res.status(201).json({ message: "Student registered successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Error registering student" });
    }
};

exports.getStudents = async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (error) {
        res.status(500).json({ error: "Error fetching students" });
    }
};
