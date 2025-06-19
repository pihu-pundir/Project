import axios from "axios";

export async function getResumeSuggestions(data) {
    const prompt = `Analyze this resume data and give 3 practical improvement tips:\n\n${JSON.stringify(data, null, 2)}`;

    try {
        const res = await axios.post(
            "https://api-inference.huggingface.co/models/google/flan-t5-large",
            { inputs: prompt },
            {
                headers: {
                    Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
                },
            }
        );

        return res.data[0]?.generated_text || "No suggestions received.";
    } catch (err) {
        console.error("❌ Hugging Face API Error:", err);
        return "Error getting suggestions.";
    }
}
