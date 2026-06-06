const express = require("express");
const mongoose = require("mongoose");
const expenseRoutes= require("./routes/expenseRoutes");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const authRoutes=
require("./routes/authRoutes");

app.use("/api/auth",authRoutes);
app.use("/api/expenses",expenseRoutes);

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

app.get("/", (req,res)=>{
    res.send("Server Running");
});

app.listen(5000,()=>{
    console.log("Server started on port 5000");
});