const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());

app.use(express.json());

let tasks = [];

// Get tasks
app.get("/tasks/:user", (req, res) => {
  const userTasks = tasks.filter(t => t.user === req.params.user);
  res.json(userTasks);
});
// Create task
app.post("/tasks", (req, res) => {
  const task = {
  id: Date.now(),
  user: req.body.user,
  name: req.body.name,
  status: "Pending",
  streak: 0,
  missed: 0
};

  tasks.push(task);
  res.json(task);
});

// Done
app.post("/done/:id", (req, res) => {
  const task = tasks.find(t => t.id == req.params.id);
  if (task) {
    task.status = "Done";
    task.streak += 1;
  }
  res.json(task);
});

// Miss
app.post("/miss/:id", (req, res) => {
  const task = tasks.find(t => t.id == req.params.id);
  if (task) {
    task.status = "Missed";
    task.streak = 0;
    task.missed += 1;
  }
  res.json(task);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running 🚀");
});

app.delete("/tasks/:id", (req, res) => {
  tasks = tasks.filter(t => t.id != req.params.id);
  res.json({ success: true });
});
