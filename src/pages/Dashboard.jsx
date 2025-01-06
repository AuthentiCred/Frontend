import { useState } from "react";
import { Card, Typography, Button } from "@material-tailwind/react";
import { useDropzone } from "react-dropzone";

export function Dashboard() {
  const [resumes, setResumes] = useState([]);

  // Handle folder upload via input
  const handleFolderUpload = (e) => {
    const files = Array.from(e.target.files);
    processFiles(files);
  };

  // Process files (only PDFs in this case)
  const processFiles = (files) => {
    const pdfFiles = files.filter((file) => file.type === "application/pdf");
    const resumeList = pdfFiles.map((file) => ({
      name: file.name,
      url: URL.createObjectURL(file),
    }));
    setResumes((prevResumes) => [...prevResumes, ...resumeList]);
    return resumeList;
  };

  // Setup Dropzone for handling file drag-and-drop
  const { getRootProps, getInputProps } = useDropzone({
    accept: ".pdf",  // Only accept PDF files
    onDrop: (acceptedFiles) => processFiles(acceptedFiles),
  });

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
            Or drag and drop a resumes below.
          </Typography>
        </div>

        {/* Drag-and-Drop Zone with react-dropzone */}
        <div
          {...getRootProps()}
          className="border-dashed border-2 p-10 rounded-md text-center cursor-pointer"
        >
          <input {...getInputProps()} />
          <Typography>
            Drag and drop resumes
          </Typography>
        </div>

        {/* Display Resumes */}
        <div className="mt-6 h-[17rem] overflow-y-auto border rounded-lg p-4">
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
