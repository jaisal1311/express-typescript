import { Router } from "express";
import { Tasks } from "../models/task";

export const taskRouter = Router();

taskRouter.get("/tasks", async (req, res) => {
  try {
    const tasks = await Tasks.find({});
    res.send(tasks);
  } catch (error) {
    res.status(500).send(error);
  }
});

taskRouter.get("/tasks/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const task = await Tasks.findById(_id);
    if (!task) {
      res.status(404).send("404");
    }
    res.send(task);
  } catch (error) {
    res.status(500).send(error);
  }
});

taskRouter.post("/tasks", async (req, res) => {
  const task = new Tasks(req.body);
  try {
    const result = await task.save();
    res.status(201).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

taskRouter.patch("/tasks/:id", async (req, res) => {
  const update = Object.keys(req.body);
  const allowedFields: string[] = ["description", "complete"];

  const isValid = update.every((field: string) =>
    allowedFields.includes(field)
  );
  if (!isValid) {
    return res.status(400);
  }
  try {
    const task = await Tasks.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    console.log(task);
    if (!task) {
      return res.status(404).send("404");
    }
    return res.send(task);
  } catch (error) {
    return res.status(500).send(error);
  }
});

taskRouter.delete("/tasks/:id", async (req, res) => {
  try {
    const task = await Tasks.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).send("404");
    }

    res.send(task);
  } catch (error) {
    res.status(500).send(error);
  }
});