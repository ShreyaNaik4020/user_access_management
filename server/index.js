require("reflect-metadata");
const express = require("express");
const { AppDataSource } = require("./data-source");
const authRoutes = require("./routes/auth");
require("dotenv").config();
const softwareRoutes = require("./routes/software");
const requestRoutes = require("./routes/request");


const app = express();
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/software", softwareRoutes);
app.use("/api/requests", requestRoutes);

const PORT = process.env.PORT || 5000;

AppDataSource.initialize()
  .then(() => {
    console.log("Connected to MySQL");
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("DB connection failed", err);
  });