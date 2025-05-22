const express = require("express");
const { AppDataSource } = require("../data-source");
const { Software } = require("../entity/software");
const { verifyToken, isAdmin } = require("../middleware/auth");

const router = express.Router();
const softwareRepo = AppDataSource.getRepository("Software");

router.post("/", verifyToken, isAdmin, async (req, res) => {
  const { name, description, accessLevels } = req.body;
  try {
    const software = softwareRepo.create({ name, description, accessLevels });
    await softwareRepo.save(software);
    res.status(201).json({ message: "Software created", software });
  } catch (err) {
    res.status(500).json({ message: "Error creating software", error: err.message });
  }
});

module.exports = router;