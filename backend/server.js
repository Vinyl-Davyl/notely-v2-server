//to allow server access .env file
const dotenv = require("dotenv").config();
const express = require('express');
const connectDB = require("./config/connectDB");
const mongoose = require("mongoose");
const Task = require("./models/taskModel");
const taskRoutes = require("./routes/taskRoute");
const cors = require("cors");

const app = express();

// Middleware, ran then the next function would be ushered in, which is our callback function.

// Using express middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));
// ---- CORS -------
// Setting up cors to allow both front and backend send requests and commication sharing the urls(gives network error without cors due to different urls)
// app.use(cors({
//     origin: ['https://localhost:8080/', 'https://deployedsite.com']
// }))

// ----- To allow cors accept network from anywhere ----
//app.use(cors());
// Make sure cors comes before other express middleware and our route, so cors run before others
// app.use(cors({
//     origin: ['https://localhost:8080/', 'http://127.0.0.1:5175/', 'https://deployedsite.com']
// }))
app.use(cors());
  

// Calling task route, evertything in task route is been accessed from our server here, "/api/task" being main route using this
//app.use("/api/tasks", taskRoutes);

app.use(taskRoutes);

// const logger = (req, res, next) => {
//     console.log("Middleware ran")
//     console.log(request.method)
//     next()
// }

// Deployment code for heroku use
// if (process.env.NODE_ENV === 'production') {
//     app.use(express.static(path.join(__dirname, "../frontend/build")));

//     app.get("*", (req, res) => {
//         res.sendFile(
//             // to locate the index.html file
//             path.resolve(__dirname, "../frontend/", "build", "index.html")
//         )
//     })
// } else {
//     app.get("/", (req, res) => {
//         res.send("Home Page");
//     })
// }

//Routes
app.get("/", (req, res) => {
    res.send("Home Page");
})

// Create a Task (logger here as middleware function, in middle before callback function)
// app.post("/api/tasks", logger, async (req, res) => {
// app.post("/api/tasks", async (req, res) => {
//     console.log(req.body);
//     res.send("Task Created");
// })

const PORT = process.env.PORT || 8080;
// Method II of connection
// mongoose
//     .connect(process.env.MONGO_URI)
//     .then(() => {
//         app.listen(PORT, () => {
//             console.log(`Server runnign on prt ${PORT}`);
//         })
//     })
//     .catch((err) => console.log(err));

//Before starting the server, wait for database connection to be established to avoid errors after connecting
const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server listening on port ${PORT}`);
        });
        
    } catch (error) {
        console.log(error);
    }
};

startServer();