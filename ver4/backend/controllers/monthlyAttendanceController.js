// backend/controllers/monthlyAttendanceController.js

const Attendance = require("../models/attendanceModel");

exports.getMonthlyAttendance = async (req, res) => {
  try {
    const { studentId, month, year } = req.query;
    if (!studentId || !month || !year) {
      return res
        .status(400)
        .json({ error: "Please provide studentId, month, and year." });
    }

    const m = parseInt(month);
    const y = parseInt(year);
    if (isNaN(m) || isNaN(y)) {
      return res.status(400).json({ error: "Invalid month or year." });
    }

    // Compute start and end dates of the month:
    const startDate = new Date(y, m - 1, 1);
    const endDate = new Date(y, m, 0); // last day of month
    const startStr = startDate.toISOString().split("T")[0];
    const endStr = endDate.toISOString().split("T")[0];

    // Fetch all attendance records for this student between startStr and endStr.
    const records = await Attendance.find({
      studentId,
      date: { $gte: startStr, $lte: endStr },
    }).sort({ date: 1 });

    // Build a complete list for each date in the month.
    let daysInMonth = [];
    for (let d = 1; d <= endDate.getDate(); d++) {
      let day = new Date(y, m - 1, d);
      let dayStr = day.toISOString().split("T")[0];
      // Find if an attendance record exists for that day.
      const rec = records.find(r => r.date === dayStr);
      daysInMonth.push({
        date: dayStr,
        status: rec ? rec.status : "Not Marked"
      });
    }
    res.json(daysInMonth);
  } catch (error) {
    console.error("Error in getMonthlyAttendance:", error);
    res.status(500).json({ error: "Server error retrieving monthly attendance." });
  }
};
