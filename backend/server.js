const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let tasks = []; // simple database

// GET all tasks
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

// ADD task
app.post("/tasks", (req, res) => {
  const task = req.body.task;
  tasks.push(task);
  res.json({ message: "Task added" });
});

// DELETE task
app.delete("/tasks/:index", (req, res) => {
  tasks.splice(req.params.index, 1);
  res.json({ message: "Task deleted" });
});

// UPDATE task
app.put("/tasks/:index", (req, res) => {
  tasks[req.params.index] = req.body.task;
  res.json({ message: "Task updated" });
});

app.listen(5000, () => {
  console.log("Backend running on http://localhost:5000");
});
