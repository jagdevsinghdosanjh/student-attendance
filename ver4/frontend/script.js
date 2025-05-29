// Function to load students into the dropdown list
async function loadStudents() {
  try {
    const response = await fetch("http://localhost:5000/api/students");
    if (!response.ok) {
      throw new Error("Unable to fetch students");
    }
    const students = await response.json();
    const studentList = document.getElementById("studentList");
    studentList.innerHTML = ""; // Clear any existing options
    students.forEach(student => {
      // Use the unique studentId property as the option value
      const option = document.createElement("option");
      option.value = student.studentId;
      option.textContent = `${student.name} (${student.class} - ${student.section})`;
      studentList.appendChild(option);
    });
  } catch (error) {
    console.error("Error loading students:", error);
  }
}

// Function to mark attendance when the user clicks the button
async function markAttendance() {
  // Log when the button is clicked to verify the event fires
  console.log("Mark Attendance button clicked");

  const studentId = document.getElementById("studentList").value;
  const status = document.getElementById("status").value;
  const date = new Date().toISOString().split("T")[0]; // Format: YYYY-MM-DD

  try {
    const response = await fetch("http://localhost:5000/api/markAttendance", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ studentId, date, status })
    });

    if (response.ok) {
      const data = await response.json();
      alert(data.message || "Attendance marked successfully!");
    } else {
      // If there is an error from the server, display the error message
      const errorData = await response.json();
      alert("Error: " + errorData.error);
      console.error("Server error:", errorData);
    }
  } catch (err) {
    console.error("Fetch error:", err);
    alert("An error occurred while marking attendance.");
  }
}

// Call loadStudents when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", loadStudents);

// --- Function to load students into the attendance dropdown ---
async function loadAttendanceStudents() {
  try {
    const response = await fetch("http://localhost:5000/api/students");
    if (!response.ok) throw new Error("Failed to load students");
    const students = await response.json();
    const studentList = document.getElementById("attStudentList");
    studentList.innerHTML = "";
    students.forEach(student => {
      const option = document.createElement("option");
      option.value = student.studentId;
      option.textContent = `${student.name} (${student.class})`;
      studentList.appendChild(option);
    });
  } catch (error) {
    console.error("Error loading attendance students:", error);
  }
}

// --- Function to view monthly attendance datewise ---
async function viewMonthlyAttendance() {
  const studentId = document.getElementById("attStudentList").value;
  const month = document.getElementById("month").value;
  const year = document.getElementById("year").value;
  if (!studentId || !month || !year) {
    alert("Please select a student, and enter month and year.");
    return;
  }
  try {
    const response = await fetch(`http://localhost:5000/api/monthlyAttendance?studentId=${studentId}&month=${month}&year=${year}`);
    if (!response.ok) {
      const errorData = await response.json();
      alert("Error: " + errorData.error);
      return;
    }
    const attendanceData = await response.json();
    let output = `<h2>Attendance for ${month}/${year}</h2>`;
    output += "<table border='1' cellpadding='5'><tr><th>Date</th><th>Status</th></tr>";
    attendanceData.forEach(day => {
      output += `<tr><td>${day.date}</td><td>${day.status}</td></tr>`;
    });
    output += "</table>";
    document.getElementById("monthlyAttendanceDisplay").innerHTML = output;
  } catch (error) {
    console.error("Error fetching monthly attendance:", error);
    alert("An error occurred while fetching monthly attendance.");
  }
}

// Load the attendance-students dropdown when the DOM is ready.
document.addEventListener("DOMContentLoaded", loadAttendanceStudents);