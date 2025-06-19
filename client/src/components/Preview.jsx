export default function Preview({ data }) {
    if (!data) return null;

    const sectionClass = "mb-6";
    const headingClass =
        "text-lg font-semibold text-blue-600 dark:text-blue-400 border-b border-gray-300 dark:border-gray-600 pb-1 mb-2";
    const textClass = "text-gray-800 dark:text-gray-100";

    return (
        <div className="mt-10 p-8 bg-white dark:bg-gray-900 rounded-xl shadow-lg max-w-3xl mx-auto print:border print:border-black font-sans">
            {/* Header */}
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-blue-700 dark:text-blue-300">{data.name}</h1>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                    {data.email} | {data.phone}
                </p>
            </div>

            {/* Summary */}
            <section className={sectionClass}>
                <h2 className={headingClass}>Professional Summary</h2>
                <p className={`leading-relaxed ${textClass}`}>{data.summary}</p>
            </section>

            {/* Skills */}
            <section className={sectionClass}>
                <h2 className={headingClass}>Skills</h2>
                <ul className={`list-disc list-inside grid grid-cols-2 gap-x-6 ${textClass}`}>
                    {data.skills.split(",").map((skill, idx) => (
                        <li key={idx}>{skill.trim()}</li>
                    ))}
                </ul>
            </section>

            {/* Experience */}
            <section className={sectionClass}>
                <h2 className={headingClass}>Experience</h2>
                <p className={`whitespace-pre-wrap leading-relaxed ${textClass}`}>
                    {data.experience}
                </p>
            </section>

            {/* Education */}
            <section className={sectionClass}>
                <h2 className={headingClass}>Education</h2>
                <p className={`whitespace-pre-wrap leading-relaxed ${textClass}`}>
                    {data.education}
                </p>
            </section>

            {/* Projects */}
            {data.projects && (
                <section className={sectionClass}>
                    <h2 className={headingClass}>Projects</h2>
                    <p className={`whitespace-pre-wrap leading-relaxed ${textClass}`}>
                        {data.projects}
                    </p>
                </section>
            )}

            {/* Certifications */}
            {data.certifications && (
                <section className={sectionClass}>
                    <h2 className={headingClass}>Certifications</h2>
                    <p className={`whitespace-pre-wrap leading-relaxed ${textClass}`}>
                        {data.certifications}
                    </p>
                </section>
            )}
        </div>
    );
}
