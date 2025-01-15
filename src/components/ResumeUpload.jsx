import { useState } from "react";
import { Card, Typography, Button } from "@material-tailwind/react";
import textract from "textract";

export function ResumeUpload() {
    const [resumes, setResumes] = useState([]);
    const [dragging, setDragging] = useState(false);

    // Handle folder upload via input
    const handleFolderUpload = (e) => {
        const files = Array.from(e.target.files);
        processFiles(files);
    };

    // Handle drag-and-drop folder
    const handleDrop = (e) => {
        e.preventDefault();
        setDragging(false);
        const files = Array.from(e.dataTransfer.items)
            .filter((item) => item.kind === "file")
            .map((item) => item.getAsFile());
        processFiles(files);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setDragging(true);
    };

    const handleDragLeave = () => setDragging(false);

    // Process files (only PDFs in this case)
    const processFiles = (files) => {
        const pdfFiles = files.filter((file) => file.type === "application/pdf");
        pdfFiles.forEach((file) => extractResumeData(file));
    };

    const extractResumeData = (file) => {
        const reader = new FileReader();
        reader.onload = () => {
            textract.fromBufferWithMime("application/pdf", reader.result, (err, text) => {
                if (err) {
                    console.error(`Error extracting text from ${file.name}:`, err);
                } else {
                    const parsedData = parseText(text);
                    setResumes((prevResumes) => {
                        const updatedResumes = [
                            ...prevResumes,
                            {
                                name: file.name,
                                url: URL.createObjectURL(file),
                                ...parsedData,
                            },
                        ];
                        console.log("Updated Resumes JSON Array:", JSON.stringify(updatedResumes, null, 2));
                        return updatedResumes;
                    });
                }
            });
        };
        reader.readAsArrayBuffer(file);
    };
    

    // Parse text to extract name, email, and phone
    const parseText = (text) => {
        const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/;
        const phoneRegex = /(\+?\d{1,4}[-.\s]?|\(\d{1,4}\)\s?)?\d{3}[-.\s]?\d{3}[-.\s]?\d{4}/;

        const emailMatch = text.match(emailRegex);
        const phoneMatch = text.match(phoneRegex);

        const lines = text.split("\n").map((line) => line.trim()).filter(Boolean);
        const name = lines.length > 0 ? lines[0] : "Unknown";

        return {
            extractedName: name,
            extractedEmail: emailMatch ? emailMatch[0] : "Not found",
            extractedPhone: phoneMatch ? phoneMatch[0] : "Not found",
        };
    };

    return (
        <div className="p-6">
            <Typography variant="h4" color="blue-gray" className="mb-4">
                HR Dashboard: Resume Management
            </Typography>
            <Card className="p-4">
                {/* Upload Resumes */}
                <div className="flex items-center mb-4">
                    <Button variant="outlined" className="mr-4">
                        <label>
                            Upload Folder
                            <input
                                type="file"
                                webkitdirectory="true"
                                multiple
                                onChange={handleFolderUpload}
                                className="hidden"
                            />
                        </label>
                    </Button>
                    <Typography color="gray">
                        Or drag and drop a folder below.
                    </Typography>
                </div>

                {/* Drag-and-Drop Zone */}
                <div
                    className={`border-dashed border-2 p-10 rounded-md text-center ${
                        dragging ? "border-blue-500 bg-blue-100" : "border-gray-300"
                    }`}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                >
                    <Typography>
                        Drag and drop your folder containing resumes here.
                    </Typography>
                </div>

                {/* Display Resumes */}
                <div className="mt-6">
                    {resumes.length > 0 ? (
                        resumes.map((resume, index) => (
                            <div
                                key={index}
                                className="flex flex-col border rounded-lg mb-4 p-4"
                            >
                                <Typography variant="h6">{resume.name}</Typography>
                                <Typography color="gray">
                                    Name: {resume.extractedName}
                                </Typography>
                                <Typography color="gray">
                                    Email: {resume.extractedEmail}
                                </Typography>
                                <Typography color="gray">
                                    Phone: {resume.extractedPhone}
                                </Typography>
                                <Button
                                    variant="text"
                                    color="blue"
                                    onClick={() => window.open(resume.url, "_blank")}
                                    className="mt-2"
                                >
                                    View Resume
                                </Button>
                            </div>
                        ))
                    ) : (
                        <Typography>No resumes uploaded yet.</Typography>
                    )}
                </div>
            </Card>
        </div>
    );
}
