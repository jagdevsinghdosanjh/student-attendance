const Attendance = require("../models/attendanceModel");

exports.markAttendance = async (req, res) => {
    try {
        const { studentId, date, status } = req.body;
        const newRecord = new Attendance({ studentId, date, status });
        await newRecord.save();
        res.status(201).json({ message: "Attendance recorded successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Error marking attendance" });
    }
};

exports.getAttendanceSummary = async (req, res) => {
    try {
        const { studentId } = req.params;
        const records = await Attendance.find({ studentId });

        let presentCount = records.filter(r => r.status === "Present").length;
        let absentCount = records.filter(r => r.status === "Absent").length;
        let leaveCount = records.filter(r => r.status === "Leave").length;

        res.json({ studentId, presentCount, absentCount, leaveCount });
    } catch (error) {
        res.status(500).json({ error: "Error fetching attendance summary" });
    }
};
