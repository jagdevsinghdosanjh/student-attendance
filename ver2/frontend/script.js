async function markAttendance() {
    let studentName = document.getElementById("studentName").value;
    if (studentName.trim() !== "") {
        await fetch("http://localhost:5000/api/addAttendance", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ studentName, month: "May", year: 2025, presentDays: 1, absentDays: 0, leaveDays: 0 })
        });

        let listItem = document.createElement("li");
        listItem.textContent = `${studentName} - Present`;
        document.getElementById("attendanceList").appendChild(listItem);
        document.getElementById("studentName").value = "";
    } else {
        alert("Please enter a student name.");
    }
}
