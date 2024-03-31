const express = require("express");
const cors = require("cors")
const { connection } = require("./database");
const { taskRouter } = require("./routes/taskRoute");
const path = require("path");
const app = express();
require("dotenv").config()


app.use(express.json());
app.use(cors());
app.use("/tasks", taskRouter)

const __dirname1 = path.resolve();

app.use(express.static(path.join(__dirname1, "frontend/dist")));

app.get("*", (req, res) =>
  res.sendFile(path.resolve(__dirname1, "frontend", "dist", "index.html"))
);

app.listen(process.env.port, async () => {
    try {
        await connection;
        console.log("Database connected..")
    } catch (error) {
        console.log("Error on connecting database",error)
    }

    console.log(`Server is running on port no ${process.env.port}`)
})