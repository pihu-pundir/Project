import express from "express";
import Resume from "../models/Resume.js";

const router = express.Router();

// Save resume to DB
router.post("/", async (req, res) => {
    try {
        const saved = await Resume.create(req.body);
        res.status(201).json(saved);
    } catch (err) {
        res.status(500).json({ error: "Failed to save resume" });
    }
});

app.post("/api/resume", async (req, res) => {
    console.log("➡️ Received POST /api/resume");
    console.log("Body:", req.body); // Add this to check incoming data
    try {
        const resume = new Resume(req.body);
        await resume.save();
        res.status(201).json({ message: "Resume saved successfully!" });
    } catch (err) {
        console.error("❌ Error saving resume:", err);
        res.status(500).json({ error: "Failed to save resume" });
    }
});


export default router;
