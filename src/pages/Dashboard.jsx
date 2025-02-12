import { useContext, useState } from "react";
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
import { api } from "../services/api";
import { DataContext } from "../context/DataProvider";

const API_KEY = import.meta.env.VITE_RESUME_PARSER_API_KEY;

export function Dashboard() {
  const [resumes, setResumes] = useState([]);
  const [parsedData, setParsedData] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [resumeUrl, setResumeUrl] = useState('');

  const mapResponse = (data) => {
    const nameParts = data.name ? data.name.split(" ") : ["Unknown"];
    return {
      firstName: nameParts[0] || "Unknown",
      lastName: nameParts.slice(1).join(" ") || "Unknown",
      email: data.email || "Not provided",
      mobile_number: data.phone || "Not provided",
    };
  };

  // Parse resume from URL
  const parseResumeUrl = async (url) => {
    try {
      const response = await axios.get(
        `https://api.apilayer.com/resume_parser/url?url=${encodeURIComponent(url)}`,
        {
          headers: { 'apikey': API_KEY }
        }
      );

      return mapResponse(response.data);
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

      return mapResponse(response.data);
    } catch (error) {
      console.error('Error parsing resume file:', error);
      throw error;
    }
  };

  const { account } = useContext(DataContext);

  const addCandidate = async (data) => {
    try {
      const url = `/users/${account.id}/candidates`; // Base URL is already set in `api.js`
      const res = await api.post(url, data);

      console.log("Candidate added successfully:", res.data);
      return res.data;
    } catch (error) {
      console.error("Error in adding candidate:", error.response?.data || error.message);
      throw error;
    }
  };


  const handleUrlSubmit = async (e) => {
    e.preventDefault();
    if (!resumeUrl) return;

    setIsProcessing(true);
    try {
      const parsedInfo = await parseResumeUrl(resumeUrl);
      setResumes(prev => [...prev, { name: `Resume from ${new URL(resumeUrl).hostname}`, url: resumeUrl }]);
      setParsedData(prev => [...prev, parsedInfo]);
      setResumeUrl('');
      console.log('Parsed Resume Data:', parsedInfo);
    } catch (error) {
      console.error('Error processing URL:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const processFiles = async (files) => {
    setIsProcessing(true);
    try {
      const supportedFiles = files.filter(file => ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(file.type));
      const resumeList = supportedFiles.map(file => ({ name: file.name, url: URL.createObjectURL(file) }));
      const parsedResumes = await Promise.all(supportedFiles.map(async (file) => {
        const parsedData = await parseResumeFile(file);
        addCandidate(parsedData);
        return parsedData;
      }));
      setResumes(prev => [...prev, ...resumeList]);
      setParsedData(prev => [...prev, ...parsedResumes]);
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
          <Typography variant="h5" color="blue-gray">HR Dashboard: Resume Management</Typography>
          <Typography color="gray" className="mt-1 font-normal">Upload and analyze candidate resumes</Typography>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleUrlSubmit} className="flex gap-2">
            <Input type="url" label="Resume URL" value={resumeUrl} onChange={(e) => setResumeUrl(e.target.value)} icon={<LinkIcon className="h-5 w-5" />} />
            <Button type="submit" disabled={isProcessing || !resumeUrl}>Parse URL</Button>
          </form>
          <Button variant="outlined" className="mt-4" disabled={isProcessing}>
            <label className="cursor-pointer">
              Upload Files
              <input type="file" multiple accept=".pdf,.doc,.docx" onChange={(e) => processFiles(Array.from(e.target.files))} className="hidden" />
            </label>
          </Button>
          <div className="mt-4">
            <List>
              {resumes.length > 0 ? resumes.map((resume, index) => (
                <ListItem key={index} className="p-4 border-b">
                  <ListItemPrefix>
                    <DocumentTextIcon className="h-5 w-5 text-blue-gray-700" />
                  </ListItemPrefix>
                  <div className="flex-grow">
                    <Typography variant="h6" color="blue-gray">{parsedData[index]?.firstName} {parsedData[index]?.lastName}</Typography>
                    <Typography color="gray" variant="small">{parsedData[index]?.email}</Typography>
                    <Typography color="gray" variant="small">{parsedData[index]?.mobile_number}</Typography>
                  </div>
                  <Button variant="text" color="blue" onClick={() => window.open(resume.url, "_blank")}>View</Button>
                </ListItem>
              )) : <ListItem><Typography color="gray">No resumes uploaded yet.</Typography></ListItem>}
            </List>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
export default Dashboard;
