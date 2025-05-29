function markAttendance() {
    let studentName = document.getElementById("studentName").value;
    if (studentName.trim() !== "") {
        let listItem = document.createElement("li");
        listItem.textContent = `${studentName} - Present`;
        document.getElementById("attendanceList").appendChild(listItem);
        document.getElementById("studentName").value = "";
    } else {
        alert("Please enter a student name.");
    }
}
