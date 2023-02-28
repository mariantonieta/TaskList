import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import Task from "./models/TaskModel.js";
const URL =
  "mongodb+srv://mariantonieta:maria_2305@cluster0.z0wo6wx.mongodb.net/TaskApp?retryWrites=true&w=majority";

const app = express();

const PORT = 5000;
app.use(express.json());
app.use(cors());

mongoose
  .connect(URL)
  .then(() => console.log("Mongodb Connected..."))
  .catch((err) => console.error(err));

app.get("/tasks", async (req, res) => {
  const todos = await Task.find();

  res.json(todos);
});

app.post("/task/new", (req, res) => {
  const todo = new Task({
    text: req.body.text,
  });

  todo.save();

  res.json(todo);
});

app.delete("/task/delete/:id", async (req, res) => {
  const result = await Task.findByIdAndDelete(req.params.id);

  res.json({ result });
});

app.get("/task/complete/:id", async (req, res) => {
  const todo = await Task.findById(req.params.id);

  todo.complete = !todo.complete;

  todo.save();

  res.json(todo);
});

app.put("/task/update/:id", async (req, res) => {
  const todo = await Task.findById(req.params.id);

  todo.text = req.body.text;

  todo.save();

  res.json(todo);
});

app.listen(PORT, () => console.log("Server running on port " + PORT));
