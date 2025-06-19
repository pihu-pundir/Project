// src/api/aiSuggest.js

export async function getResumeSuggestions(data) {
    try {
        const response = await fetch("https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.1", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${import.meta.env.VITE_HUGGINGFACE_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                inputs: `
You are an expert career coach. Suggest 3 specific, actionable improvements for this resume:

Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}
Summary: ${data.summary}
Skills: ${data.skills}
Experience: ${data.experience}
Education: ${data.education}
Projects: ${data.projects}
Certifications: ${data.certifications}
`
            }),
        });

        const result = await response.json();

        if (Array.isArray(result) && result[0]?.generated_text) {
            return result[0].generated_text.trim();
        }

        console.error("Unexpected Hugging Face response:", result);
        return result.error || "No suggestions returned.";
    } catch (err) {
        console.error("❌ AI Suggestion Error:", err);
        return "Error fetching suggestions.";
    }
}
