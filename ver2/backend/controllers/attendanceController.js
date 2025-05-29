const Attendance = require("../models/attendanceModel");

exports.addAttendance = async (req, res) => {
    try {
        const { studentName, month, year, presentDays, absentDays, leaveDays } = req.body;
        const newRecord = new Attendance({ studentName, month, year, presentDays, absentDays, leaveDays });
        await newRecord.save();
        res.status(201).json({ message: "Attendance recorded successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Error saving attendance record" });
    }
};

exports.getAttendanceSummary = async (req, res) => {
    try {
        const { studentName, year } = req.params;
        const records = await Attendance.find({ studentName, year });

        let totalPresent = 0, totalAbsent = 0, totalLeaves = 0;
        records.forEach(record => {
            totalPresent += record.presentDays;
            totalAbsent += record.absentDays;
            totalLeaves += record.leaveDays;
        });

        res.json({ studentName, year, totalPresent, totalAbsent, totalLeaves });
    } catch (error) {
        res.status(500).json({ error: "Error fetching attendance summary" });
    }
};
