const mongoose = require("mongoose");
const connectDB = require("./config");
const Student = require("./models/studentModel");

const students = [
    { name: "John Doe", rollNumber: "001", class: "10A", session: "2025" },
    { name: "Jane Smith", rollNumber: "002", class: "10A", session: "2025" },
    { name: "Alice Johnson", rollNumber: "003", class: "10A", session: "2025" }
];

const seedDatabase = async () => {
    await connectDB();
    await Student.insertMany(students);
    console.log("Students pre-registered!");
    mongoose.connection.close();
};

seedDatabase();
