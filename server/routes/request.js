const express = require("express");
const { AppDataSource } = require("../data-source");
const { Request } = require("../entity/Request");
const { User } = require("../entity/user");
const { Software } = require("../entity/software");
const { verifyToken } = require("../middleware/auth");

const router = express.Router();

const requestRepo = AppDataSource.getRepository("Request");
const userRepo = AppDataSource.getRepository("User");
const softwareRepo = AppDataSource.getRepository("Software");

// ✅ 1. Employee: Submit new access request
router.post("/", verifyToken, async (req, res) => {
  const { softwareId, accessType, reason } = req.body;

  try {
    const user = await userRepo.findOneBy({ id: req.user.id });
    const software = await softwareRepo.findOneBy({ id: softwareId });

    if (!software) return res.status(404).json({ message: "Software not found" });

    const newRequest = requestRepo.create({
      user,
      software,
      accessType,
      reason,
      status: "Pending",
    });

    await requestRepo.save(newRequest);
    res.status(201).json({ message: "Access request submitted" });
  } catch (err) {
    res.status(500).json({ message: "Request failed", error: err.message });
  }
});


router.get("/", verifyToken, async (req, res) => {
  if (req.user.role !== "Manager") {
    return res.status(403).json({ message: "Access denied: Managers only" });
  }

  try {
    const pendingRequests = await requestRepo.find({
      where: { status: "Pending" },
    });
    res.json(pendingRequests);
  } catch (err) {
    res.status(500).json({ message: "Error fetching requests" });
  }
});


router.patch("/:id", verifyToken, async (req, res) => {
  if (req.user.role !== "Manager") {
    return res.status(403).json({ message: "Access denied: Managers only" });
  }

  const { id } = req.params;
  const { status } = req.body; 

  if (!["Approved", "Rejected"].includes(status)) {
    return res.status(400).json({ message: "Invalid status value" });
  }

  try {
    const request = await requestRepo.findOneBy({ id: parseInt(id) });
    if (!request) return res.status(404).json({ message: "Request not found" });

    request.status = status;
    await requestRepo.save(request);

    res.json({ message: `Request ${status}` });
  } catch (err) {
    res.status(500).json({ message: "Error updating request" });
  }
});

module.exports = router;