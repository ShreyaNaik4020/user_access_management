const express = require("express")
const bcrypt = require("bcrypt")
const { AppDataSource } = require("../data-source")
const { User } = require("../entity/user")
const { generateToken } = require("../utils/jwt")

const router = express.Router()
const userRepo = AppDataSource.getRepository("User")

router.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  const hashed = await bcrypt.hash(password, 10)

  try {
    const user = userRepo.create({
      username,
      password: hashed,
      role: "Employee", 
    })
    await userRepo.save(user);
    res.status(201).json({ message: "User created" })
  } catch (err) {
    res.status(400).json({ message: "Username already exists" })
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await userRepo.findOneBy({ username })

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Invalid credentials" })
  }

  const token = generateToken(user.id, user.role)
  res.json({ token, role: user.role })
});

module.exports = router
