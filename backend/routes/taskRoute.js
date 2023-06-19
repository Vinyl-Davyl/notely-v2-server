const express = require("express");
const Task = require("../models/taskModel");
const { createTask, getTasks, getTask, deleteTask, updateTask } = require("../controllers/taskController");
const router = express.Router();

// Create a Task / Save to database --- now already plugged to the controller, can "/api/tasks" appended in server -- "/"
router.post("/api/v1/tasks", createTask);

// Get all tasks/Read Tasks(using .find() method to find/get all the task) --- now already plugged to the controller, can "/api/tasks" appended in server -- "/"
router.get("/api/v1/tasks", getTasks)

// Get a single task(by adding a params `.../:id`), can "/api/tasks" appended in server -- "/"
router.get("/api/v1/tasks/:id", getTask);

// Delete a task, can "/api/tasks" appended in server -- "/"
router.delete("/api/v1/tasks/:id", deleteTask);

// Update a task, can "/api/tasks" appended in server -- "/"
router.put("/api/v1/tasks/:id", updateTask);

module.exports = router