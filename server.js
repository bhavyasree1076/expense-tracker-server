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
.then(() => { 
    console.log("MongoDB Connected");
})
.catch((err) => { console.log("MongoDB Error:", err); 

});

app.get("/", (req,res)=>{
    res.send("Server Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
