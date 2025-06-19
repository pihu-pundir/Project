import html2pdf from "html2pdf.js";
import { useEffect, useRef, useState } from "react";
import Preview from "./components/Preview";
import ResumeForm from "./components/ResumeForm";

function App() {
  const [resumeData, setResumeData] = useState(null);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  const previewRef = useRef();

  // ✅ Apply theme class to root
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  // ✅ Handle form submission
  const handleFormSubmit = async (data) => {
    setResumeData(data);

    try {
      const response = await fetch("http://localhost:5000/api/resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log("✅ Resume saved:", result);
    } catch (error) {
      console.error("❌ Error saving resume:", error);
    }
  };

  // ✅ Download as PDF
  const handleDownloadPDF = () => {
    const element = previewRef.current;
    if (!element) return;

    const opt = {
      margin: 0.5,
      filename: `${resumeData.name || "resume"}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    };

    html2pdf().set(opt).from(element).save();
  };

  // ✅ Clear resume to re-edit
  const handleClear = () => {
    setResumeData(null);
  };

  return (
    <div className={`${darkMode ? "dark" : ""}`}>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white p-6 transition-colors duration-300">
        {/* 🌗 Toggle Switch */}
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-4 py-2 rounded-md text-sm bg-gray-300 dark:bg-gray-800 dark:text-white hover:bg-gray-400 dark:hover:bg-gray-700 transition"
          >
            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>

        {/* Form or Preview */}
        {!resumeData ? (
          <ResumeForm onSubmit={handleFormSubmit} />
        ) : (
          <>
            <div className="flex justify-center space-x-4 my-4">
              <button
                onClick={handleDownloadPDF}
                className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition"
              >
                Download PDF
              </button>
              <button
                onClick={handleClear}
                className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition"
              >
                Edit Again
              </button>
            </div>

            <div ref={previewRef}>
              <Preview data={resumeData} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
