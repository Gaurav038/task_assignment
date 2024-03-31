const express = require("express");
const taskRouter = express.Router();
const { addTask, getTask, getTaskById, deleteTask, updateTask } = require("../controller/taskController")

//  add task
taskRouter.post("/add", addTask)

//  getting all task
taskRouter.get("/allTask", getTask)

taskRouter.get("/task/:id", getTaskById)

// delete task
taskRouter.delete("/delete/:id", deleteTask)

// update task
taskRouter.patch("/edit/:id", updateTask)


module.exports = { taskRouter }