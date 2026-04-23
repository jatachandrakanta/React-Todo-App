const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// DB CONNECT
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("DB Connected"))
  .catch(err => console.log(err));

// ROUTES
app.use("/api/todos", require("./routes/todoRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("Backend Working ✅");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
console.log(require("./routes/todoRoutes"));
console.log(require("./routes/authRoutes"));