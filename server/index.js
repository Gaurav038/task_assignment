const express = require("express");
const cors = require("cors")
const { connection } = require("./database");
const { taskRouter } = require("./routes/taskRoute");

const app = express();
require("dotenv").config()


app.use(express.json());
app.use(cors());
app.use("/tasks", taskRouter)


app.listen(process.env.port, async () => {
    try {
        await connection;
        console.log("Database connected..")
    } catch (error) {
        console.log("Error on connecting database")
    }

    console.log(`Server is running on port no ${process.env.port}`)
})