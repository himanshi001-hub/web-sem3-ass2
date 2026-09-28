const express = require("express");
const router = express.Router();
const students = require("../data/students");

// ---------- Helpers ----------
const parseId = (value) => {
  const id = Number(value);
  return Number.isInteger(id) && id > 0 ? id : null;
};

// Validates body; returns an error message or null
const validateStudent = ({ name, age, course }) => {
  if (typeof name !== "string" || name.trim() === "")
    return "name is required and must be a non-empty string";
  if (!Number.isInteger(age) || age <= 0)
    return "age is required and must be a positive integer";
  if (typeof course !== "string" || course.trim() === "")
    return "course is required and must be a non-empty string";
  return null;
};

// ---------- Routes ----------

// GET /students - all students
router.get("/", (req, res) => {
  res.status(200).json(students);
});

// GET /students/:id - single student
router.get("/:id", (req, res) => {
  const id = parseId(req.params.id);
  if (id === null) return res.status(400).json({ error: "Invalid student id" });

  const student = students.find((s) => s.id === id);
  if (!student) return res.status(404).json({ error: "Student not found" });

  res.status(200).json(student);
});

// POST /students - create student
router.post("/", (req, res) => {
  const body = req.body || {};
  const error = validateStudent(body);
  if (error) return res.status(400).json({ error });

  const newId = students.length ? Math.max(...students.map((s) => s.id)) + 1 : 1;
  const student = {
    id: newId,
    name: body.name.trim(),
    age: body.age,
    course: body.course.trim(),
  };
  students.push(student);

  res.status(201).json(student);
});

// PUT /students/:id - update student
router.put("/:id", (req, res) => {
  const id = parseId(req.params.id);
  if (id === null) return res.status(400).json({ error: "Invalid student id" });

  const student = students.find((s) => s.id === id);
  if (!student) return res.status(404).json({ error: "Student not found" });

  const body = req.body || {};
  const error = validateStudent(body);
  if (error) return res.status(400).json({ error });

  student.name = body.name.trim();
  student.age = body.age;
  student.course = body.course.trim();

  res.status(200).json(student);
});

// DELETE /students/:id - delete student
router.delete("/:id", (req, res) => {
  const id = parseId(req.params.id);
  if (id === null) return res.status(400).json({ error: "Invalid student id" });

  const index = students.findIndex((s) => s.id === id);
  if (index === -1) return res.status(404).json({ error: "Student not found" });

  const [deleted] = students.splice(index, 1);
  res.status(200).json({ message: "Student deleted successfully", student: deleted });
});

module.exports = router;
