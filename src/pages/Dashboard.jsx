import { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  List,
  ListItem,
  ListItemPrefix,
  Input,
} from "@material-tailwind/react";
import { DocumentIcon, DocumentTextIcon, LinkIcon } from "@heroicons/react/24/solid";
import axios from 'axios';

// Replace with your API key
const API_KEY = import.meta.env.VITE_RESUME_PARSER_API_KEY;

export function Dashboard() {
  const [resumes, setResumes] = useState([]);
  const [parsedData, setParsedData] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [resumeUrl, setResumeUrl] = useState('');

  // Parse resume from URL
  const parseResumeUrl = async (url) => {
    try {
      const response = await axios.get(
        `https://api.apilayer.com/resume_parser/url?url=${encodeURIComponent(url)}`,
        {
          headers: {
            'apikey': API_KEY
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error parsing resume URL:', error);
      throw error;
    }
  };

  // Parse resume from file
  const parseResumeFile = async (file) => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post(
        'https://api.apilayer.com/resume_parser/upload',
        file,
        {
          headers: {
            'Content-Type': 'application/octet-stream',
            'apikey': API_KEY
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error parsing resume file:', error);
      throw error;
    }
  };

  // Handle URL submission
  const handleUrlSubmit = async (e) => {
    e.preventDefault();
    if (!resumeUrl) return;

    setIsProcessing(true);
    try {
      const parsedInfo = await parseResumeUrl(resumeUrl);

      const newResume = {
        name: `Resume from ${new URL(resumeUrl).hostname}`,
        url: resumeUrl
      };

      setResumes(prev => [...prev, newResume]);
      setParsedData(prev => [...prev, parsedInfo]);
      setResumeUrl('');

      console.log('Parsed Resume Data:', parsedInfo);
    } catch (error) {
      console.error('Error processing URL:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  // Handle folder upload via input
  const handleFolderUpload = async (e) => {
    const files = Array.from(e.target.files);
    await processFiles(files);
  };

  // Process files
  const processFiles = async (files) => {
    setIsProcessing(true);
    try {
      const supportedFiles = files.filter(file =>
        ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
          .includes(file.type)
      );

      const resumeList = supportedFiles.map((file) => ({
        name: file.name,
        url: URL.createObjectURL(file),
      }));

      // Parse each resume
      const parsedResumes = await Promise.all(
        supportedFiles.map(async (file) => {
          const parsedData = await parseResumeFile(file);
          return parsedData;
        })
      );

      setResumes((prevResumes) => [...prevResumes, ...resumeList]);
      setParsedData((prevData) => [...prevData, ...parsedResumes]);

      console.log('All Parsed Resumes:', parsedResumes);
    } catch (error) {
      console.error('Error processing files:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="p-6">
      <Card className="w-full">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-4 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
                HR Dashboard: Resume Management
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                Upload and analyze candidate resumes
              </Typography>
            </div>
          </div>
        </CardHeader>
        <CardBody className="px-0">
          <div className="flex flex-col gap-4 p-4">
            {/* URL Input Section */}
            <div className="flex items-center gap-4">
              <div className="flex-grow">
                <form onSubmit={handleUrlSubmit} className="flex gap-2">
                  <div className="flex-grow">
                    <Input
                      type="url"
                      label="Resume URL"
                      value={resumeUrl}
                      onChange={(e) => setResumeUrl(e.target.value)}
                      icon={<LinkIcon className="h-5 w-5" />}
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={isProcessing || !resumeUrl}
                  >
                    Parse URL
                  </Button>
                </form>
              </div>
            </div>

            {/* Upload Section */}
            <div className="flex items-center gap-4">
              <Button
                variant="outlined"
                className="flex items-center gap-3"
                disabled={isProcessing}
              >
                <DocumentIcon strokeWidth={2} className="h-5 w-5" />
                <label className="cursor-pointer">
                  {isProcessing ? 'Processing...' : 'Upload Files'}
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx"
                    onChange={handleFolderUpload}
                    className="hidden"
                    disabled={isProcessing}
                  />
                </label>
              </Button>
              <Typography color="gray" className="font-normal">
                Or drag and drop resumes below
              </Typography>
            </div>

            {/* Drop Zone */}
            <div
              onDrop={(e) => {
                e.preventDefault();
                if (!isProcessing) {
                  const files = Array.from(e.dataTransfer.files);
                  processFiles(files);
                }
              }}
              onDragOver={(e) => e.preventDefault()}
              className={`border-2 border-dashed border-blue-gray-50 p-8 rounded-lg text-center cursor-pointer ${isProcessing ? 'opacity-50' : ''
                }`}
            >
              <DocumentTextIcon className="h-12 w-12 mx-auto text-blue-gray-300" />
              <Typography variant="h6" color="blue-gray" className="mt-2">
                {isProcessing ? 'Processing...' : 'Drop resumes here'}
              </Typography>
              <Typography color="gray" className="text-sm mt-1">
                Supports PDF, DOC, and DOCX files
              </Typography>
            </div>

            {/* Resume List */}
            <div className="mt-4">
              <List>
                {resumes.length > 0 ? (
                  resumes.map((resume, index) => (
                    <ListItem key={index} className="p-4 border-b">
                      <ListItemPrefix>
                        <DocumentTextIcon className="h-5 w-5 text-blue-gray-700" />
                      </ListItemPrefix>
                      <div className="flex-grow">
                        <Typography variant="h6" color="blue-gray">
                          {parsedData[index]?.name || "Name not found"}
                        </Typography>
                        <Typography color="gray" variant="small">
                          {parsedData[index]?.email || "Email not found"}
                        </Typography>
                        <Typography color="gray" variant="small">
                          {parsedData[index]?.phone || "Phone not found"}
                        </Typography>
                      </div>
                      <Button
                        variant="text"
                        color="blue"
                        className="flex items-center gap-2"
                        onClick={() => window.open(resume.url, "_blank")}
                      >
                        View
                      </Button>
                    </ListItem>
                  ))
                ) : (
                  <ListItem>
                    <Typography color="gray">
                      No resumes uploaded yet.
                    </Typography>
                  </ListItem>
                )}
              </List>

            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default Dashboard;