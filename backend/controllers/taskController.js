// Controller, basically like a file where we save all of our callback functions
const Task = require("../models/taskModel");

// Create a task
const createTask = async (req, res) => {
    try {
        const task = await Task.create(req.body)
        res.status(200).json(task)
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
};

// Get all tasks
const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find()
        res.status(200).json(tasks)
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}

// Get a single task
const getTask = async (req, res) => {
    // Destructuring the id
    try {
        const {id} = req.params;
        const task = await Task. findById(id)
        if (!task) {
            return res.status(404).json(`NO task with id: ${id}`);
        }
        res.status(200).json(task)
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
    // console.log(req.params);
    // To prevent request from running endlesssly
    // res.send("Get single task");
};

// Delete Task
const deleteTask = async (req, res) => {
    try {
        const {id} = req.params;
        const task = await Task.findByIdAndDelete(id);
        if (!task) {
            return res.status(404).send(`NO task with id: ${id}`);
        }

        res.status(200).send("Task deleted");
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};

// Update a Task
const updateTask = async (req, res) => {
    try {
        const {id} = req.params
        const task = await Task.findByIdAndUpdate(
            // adding _id, request body  and specifying that we're going to add a new entry into the database, optionally adding runValidators to ensure validation on put
            {_id: id}, req.body, 
            {
                new: true,
                runValidators: true,
            }
        );
        if (!task){
            return res.status(404).json(`NO task with id: ${id}`)
        }
        res.status(200).json(task)
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

module.exports = {
    createTask, 
    getTasks,
    getTask,
    deleteTask,
    updateTask
}