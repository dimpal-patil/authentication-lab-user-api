const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT;
require("./db/connection");
const userRoutes = require("./routes/userRoutes.js");

app.use(express.json());
app.use("/api/users", userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port: http://localhost:${PORT}`);
});