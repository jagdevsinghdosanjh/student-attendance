const Attendance = require("../models/attendanceModel");
const Student = require("../models/studentModel");

exports.markAttendance = async (req, res) => {
  try {
    const { studentId, date, status } = req.body;

    // Verify that the student exists in the Student collection.
    const studentExists = await Student.findOne({ studentId });
    if (!studentExists) {
      return res.status(400).json({ error: "Student not found in records." });
    }

    // Prevent duplicate attendance records for the same student and date.
    const attendanceExists = await Attendance.findOne({ studentId, date });
    if (attendanceExists) {
      return res.status(400).json({ error: "Attendance for this date has already been marked." });
    }

    // Create and save the new attendance record.
    const newAttendance = new Attendance({ studentId, date, status });
    await newAttendance.save();

    res.status(201).json({ message: "Attendance recorded successfully!" });
  } catch (error) {
    console.error("Error in markAttendance:", error);
    res.status(500).json({ error: "Server error while marking attendance." });
  }
};

// Optionally, include a controller to get an attendance summary
exports.getAttendanceSummary = async (req, res) => {
  try {
    const { studentId } = req.params;
    const records = await Attendance.find({ studentId });
    const presentCount = records.filter(record => record.status === "Present").length;
    const absentCount = records.filter(record => record.status === "Absent").length;
    const leaveCount = records.filter(record => record.status === "Leave").length;

    res.json({ studentId, presentCount, absentCount, leaveCount });
  } catch (error) {
    console.error("Error fetching attendance summary:", error);
    res.status(500).json({ error: "Error fetching attendance summary." });
  }
};


// // const Attendance = require("../models/attendanceModel");

// // exports.markAttendance = async (req, res) => {
// //     try {
// //         const { studentId, date, status } = req.body;

// //         // Check if student exists
// //         const studentExists = await Attendance.findOne({ studentId });
// //         if (!studentExists) {
// //             return res.status(400).json({ error: "Student ID not found!" });
// //         }

// //         const newRecord = new Attendance({ studentId, date, status });
// //         await newRecord.save();
// //         res.status(201).json({ message: "Attendance recorded successfully!" });
// //     } catch (error) {
// //         res.status(500).json({ error: "Error marking attendance" });
// //     }
// // };

// // exports.getAttendanceSummary = async (req, res) => {
// //     try {
// //         const { studentId } = req.params;
// //         const records = await Attendance.find({ studentId });

// //         let presentCount = records.filter(r => r.status === "Present").length;
// //         let absentCount = records.filter(r => r.status === "Absent").length;
// //         let leaveCount = records.filter(r => r.status === "Leave").length;

// //         res.json({ studentId, presentCount, absentCount, leaveCount });
// //     } catch (error) {
// //         res.status(500).json({ error: "Error fetching attendance summary" });
// //     }
// // };

// const Attendance = require("../models/attendanceModel");
// const Student = require("../models/studentModel");

// exports.markAttendance = async (req, res) => {
//     try {
//         const { studentId, date, status } = req.body;

//         // Verify that the student exists in the Student collection
//         const studentFound = await Student.findOne({ studentId });
//         if (!studentFound) {
//             return res.status(400).json({ error: "Student ID not found in Student records!" });
//         }

//         // Optionally check if attendance for that date already exists
//         const existingAttendance = await Attendance.findOne({ studentId, date });
//         if (existingAttendance) {
//             return res.status(400).json({ error: "Attendance for this date has already been marked!" });
//         }

//         // Create and save the attendance record
//         const newRecord = new Attendance({ studentId, date, status });
//         await newRecord.save();
//         res.status(201).json({ message: "Attendance recorded successfully!" });
//     } catch (error) {
//         console.error("Error in markAttendance:", error);
//         res.status(500).json({ error: "Error marking attendance", details: error.message });
//     }
// };
