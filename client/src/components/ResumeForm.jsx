import axios from "axios";
import { useState } from "react";
import { getResumeSuggestions } from "../api/aiSuggest";

export default function ResumeForm({ onSubmit }) {
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        summary: "",
        skills: "",
        experience: "",
        education: "",
        projects: "",
        certifications: "",
    });

    const [loading, setLoading] = useState(false);
    const [suggestions, setSuggestions] = useState("");

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);

        try {
            // Save resume to backend
            await axios.post("http://localhost:5000/api/resume", form);

            // Get AI suggestions
            const aiSuggestion = await getResumeSuggestions(form);
            setSuggestions(aiSuggestion || "No suggestions returned.");

            // Pass form to parent for PDF or preview
            onSubmit(form);
        } catch (err) {
            console.error("❌ Error:", err);
            if (err.response?.status === 429) {
                alert("Rate limit hit. Try again later.");
            } else {
                alert("Something went wrong while saving or generating suggestions.");
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-4 p-6 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-xl shadow-md max-w-xl mx-auto"
        >
            <h2 className="text-2xl font-bold text-center">Resume Details</h2>

            {[
                "name",
                "email",
                "phone",
                "summary",
                "skills",
                "experience",
                "education",
                "projects",
                "certifications",
            ].map((field) => (
                <div key={field}>
                    <label className="block font-medium capitalize text-gray-800 dark:text-gray-100">
                        {field}
                    </label>
                    <textarea
                        name={field}
                        value={form[field]}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-400"
                        rows={["summary", "experience", "education"].includes(field) ? 3 : 1}
                        placeholder={`Enter your ${field}`}
                    />
                </div>
            ))}

            <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
                disabled={loading}
            >
                {loading ? "Saving..." : "Generate Resume"}
            </button>

            {suggestions && (
                <div className="mt-6 p-4 border rounded bg-gray-100 dark:bg-gray-700 text-sm whitespace-pre-wrap">
                    <h3 className="font-semibold text-lg mb-2">💡 AI Suggestions:</h3>
                    {suggestions}
                </div>
            )}
        </form>
    );
}
