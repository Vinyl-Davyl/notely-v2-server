const mongoose = require('mongoose');

//Schema definitions(Needs to be inside a model)
const taskSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please add a task"]
        },
        completed: {
            type: Boolean,
            required: true,
            default: false
        }
    },
    {
        // Timestamps to automatically add timestamps to any data we try to add to the DB
        timestamps: true,
    }
)

const Task = mongoose.model("Task", taskSchema)

module.exports = Task