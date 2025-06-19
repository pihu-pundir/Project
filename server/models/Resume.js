import mongoose from "mongoose";

const ResumeSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    summary: String,
    skills: String,
    experience: String,
    education: String,
    projects: String,
    certifications: String
});

const ResumeModel = mongoose.model("Resume", ResumeSchema);
export default ResumeModel;
