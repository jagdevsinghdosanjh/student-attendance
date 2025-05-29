// const express = require("express");
// const { getStudents } = require("../controllers/studentController");

// const router = express.Router();

// router.get("/students", getStudents);

// module.exports = router;

const express = require("express");
const { registerStudent, getStudents } = require("../controllers/studentController");

const router = express.Router();

router.post("/registerStudent", registerStudent);
router.get("/students", getStudents);

module.exports = router;
