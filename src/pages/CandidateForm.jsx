import React, { useState } from "react";
import {
  Button,
  Input,
  Card,
  CardBody,
  Typography,
} from "@material-tailwind/react";

const CandidateForm = () => {
  const [previousEmployers, setPreviousEmployers] = useState([]);
  const [educations, setEducations] = useState([]);

  const handleAddEmployer = () => {
    setPreviousEmployers([
      ...previousEmployers,
      { name: "", email: "", company: "" },
    ]);
  };

  const handleEmployerChange = (index, field, value) => {
    const updatedEmployers = previousEmployers.map((employer, i) =>
      i === index ? { ...employer, [field]: value } : employer
    );
    setPreviousEmployers(updatedEmployers);
  };

  const handleAddEducation = () => {
    setEducations([
      ...educations,
      { name: "", email: "", requiredNumber: "" },
    ]);
  };

  const handleEducationChange = (index, field, value) => {
    const updatedEducations = educations.map((education, i) =>
      i === index ? { ...education, [field]: value } : education
    );
    setEducations(updatedEducations);
  };

  return (
    <Card className="max-w-3xl mx-auto mt-10">
      <CardBody>
        <Typography variant="h4" className="mb-4">
          Candidate Details Form
        </Typography>

        {/* Basic Details */}
        <div className="space-y-4">
          <Input label="First Name" size="lg" required />
          <Input label="Surname" size="lg" required />
          <Input label="Mobile Number" size="lg" type="tel" required />
          <Input label="Email" size="lg" type="email" required />
        </div>

        {/* Previous Employers */}
        <div className="mt-6">
          <Typography variant="h5" className="mb-2">
            Previous Employers
          </Typography>

          {previousEmployers.map((employer, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <Input
                label="Name"
                value={employer.name}
                onChange={(e) =>
                  handleEmployerChange(index, "name", e.target.value)
                }
                required
              />
              <Input
                label="Email"
                type="email"
                value={employer.email}
                onChange={(e) =>
                  handleEmployerChange(index, "email", e.target.value)
                }
              />
              <Input
                label="Company Name"
                value={employer.company}
                onChange={(e) =>
                  handleEmployerChange(index, "company", e.target.value)
                }
                required
              />
            </div>
          ))}

          <Button onClick={handleAddEmployer} variant="gradient">
            Add Employer
          </Button>
        </div>

        {/* Education */}
        <div className="mt-6">
          <Typography variant="h5" className="mb-2">
            Education
          </Typography>

          {educations.map((education, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <Input
                label="College/School Name"
                value={education.name}
                onChange={(e) =>
                  handleEducationChange(index, "name", e.target.value)
                }
                required
              />
              <Input
                label="Email (Optional)"
                type="email"
                value={education.email}
                onChange={(e) =>
                  handleEducationChange(index, "email", e.target.value)
                }
              />
              <Input
                label="Required Number"
                value={education.requiredNumber}
                onChange={(e) =>
                  handleEducationChange(index, "requiredNumber", e.target.value)
                }
                required
              />
            </div>
          ))}

          <Button onClick={handleAddEducation} variant="gradient">
            Add Education
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};

export default CandidateForm;
