import express from "express";
import ResumeModel from "../models/Resume.js";

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const newResume = new ResumeModel(req.body);
        const savedResume = await newResume.save();
        console.log("✅ Resume saved:", savedResume);
        res.status(201).json({ message: 'Resume saved!' });
    } catch (err) {
        console.error("❌ Error saving resume:", err.message);
        res.status(500).json({ error: 'Failed to save resume' });
    }
});

router.post('/', async (req, res) => {
    const newResume = new ResumeModel(req.body);
    await newResume.save();
    res.status(201).json({ message: 'Resume saved!' });
});

export default router;
