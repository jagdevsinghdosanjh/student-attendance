// // async function loadStudents() {
//     let response = await fetch("http://localhost:5000/api/students");
//     let students = await response.json();
//     let studentList = document.getElementById("studentList");

//     studentList.innerHTML = ""; // Clear previous options

//     students.forEach(student => {
//         let option = document.createElement("option");
//         option.value = student._id;
//         option.textContent = `${student.name} (${student.rollNumber})`;
//         studentList.appendChild(option);
//     });
// }

// document.addEventListener("DOMContentLoaded", loadStudents);

async function loadStudents() {
    let response = await fetch("http://localhost:5000/api/students");
    let students = await response.json();
    let studentList = document.getElementById("studentList");

    studentList.innerHTML = ""; // Clear previous options

    students.forEach(student => {
        let option = document.createElement("option");
        option.value = student._id;
        option.textContent = `${student.name} (${student.rollNumber})`;
        studentList.appendChild(option);
    });
}

document.addEventListener("DOMContentLoaded", loadStudents);
