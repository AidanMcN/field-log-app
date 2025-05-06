const express = require("express");
const router = express.Router();
const Log = require("../models/Log");

// GET all logs
router.get("/", async (req, res) => {
  try {
    const logs = await Log.find().sort({ date: -1 });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new log
router.post("/", async (req, res) => {
  const { location, description, createdBy } = req.body;
  const newLog = new Log({ location, description, createdBy });

  try {
    const savedLog = await newLog.save();
    res.status(201).json(savedLog);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
// DELETE a log by ID
router.delete("/:id", async (req, res) => {
    try {
      const log = await Log.findById(req.params.id);
      if (!log) return res.status(404).json({ message: "Log not found" });
  
      await log.deleteOne();
      res.json({ message: "Log deleted" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  // PUT route for updates
router.put("/:id", async (req, res) => {
    const updatedLog = await Log.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updatedLog);
  });
  

module.exports = router;
