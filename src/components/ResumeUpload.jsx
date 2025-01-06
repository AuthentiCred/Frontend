import { useState } from "react";
import { Card, Typography, Button } from "@material-tailwind/react";

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
        const resumeList = pdfFiles.map((file) => ({
            name: file.name,
            url: URL.createObjectURL(file),
        }));
        setResumes((prevResumes) => [...prevResumes, ...resumeList]);
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
                                // directory="true"
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
                    className={`border-dashed border-2 p-10 rounded-md text-center ${dragging ? "border-blue-500 bg-blue-100" : "border-gray-300"
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
                                className="flex justify-between items-center p-2 border rounded-lg mb-2"
                            >
                                <Typography>{resume.name}</Typography>
                                <Button
                                    variant="text"
                                    color="blue"
                                    onClick={() => window.open(resume.url, "_blank")}
                                >
                                    View
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