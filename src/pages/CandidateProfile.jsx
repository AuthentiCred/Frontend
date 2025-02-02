import React from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  Chip,
  Avatar
} from "@material-tailwind/react";

const CandidateProfile = () => {
  const candidate = {
    id: "#5",
    name: "Ujwal Khairnar",
    location: "Pune, India",
    profilePic: "https://randomuser.me/api/portraits/men/4.jpg",
    email: "ukkvlogs@gmail.com",
    phone: "594045984859",
    languages: [
      { code: "in", name: "Hindi" },
      { code: "gb", name: "English" },
      { code: "es", name: "Spanish" }
    ],
    socialLinks: [
      { name: "Instagram", url: "https://www.instagram.com" },
      { name: "LinkedIn", url: "https://www.linkedin.com" },
      { name: "Twitter", url: "https://www.twitter.com" },
      { name: "GitHub", url: "https://www.github.com" }
    ],
    badges: [
      { title: "TOP LUXURY HIGH END", year: "2020-2023", color: "green" },
      { title: "TOP 1%", year: "2023", color: "purple" },
      { title: "TOP 10%", year: "2023", color: "pink" }
    ],
    stats: {
      problems: 2,
      offMarket: 105,
      management: "Yes",
      topCategory: "Rent",
      feedback: "Honest"
    },
    experience: [
      {
        role: "Sr. Real Estate Agent",
        company: "Agency X (Part Time)",
        location: "Pune, India",
        year: "2021",
        description: "Specialized in luxury properties, managing both client expectations and market trends."
      },
      {
        role: "Sales Agent",
        company: "Agency X (Part Time)",
        location: "Pune, India",
        year: "2020",
        description: "Handled customer inquiries, assisted in property tours, and closed multiple sales."
      },
      {
        role: "Jr. Sales Agent",
        company: "Agency X (Part Time)",
        location: "Pune, India",
        year: "2019",
        description: "Supported senior agents with paperwork and customer service."
      }
    ]
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-6">
      <Card className="w-full max-w-4xl">
        <CardBody>
          {/* Header Section */}
          <div className="flex justify-between items-start mb-8">
            <div className="flex items-start gap-6">
              <Avatar
                src={candidate.profilePic}
                alt="Profile"
                size="xxl"
                className="rounded-lg"
              />
              
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Typography variant="h6" color="blue-gray">
                    {candidate.id}
                  </Typography>
                  <Typography variant="h4" color="blue-gray">
                    {candidate.name}
                  </Typography>
                </div>
                
                <div className="flex items-center gap-4 mb-4">
                  <Typography
                    as="a"
                    href="#"
                    variant="small"
                    color="blue-gray"
                    className="flex items-center gap-1 hover:text-purple-500"
                  >
                    🌐 Website
                  </Typography>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="flex items-center gap-1"
                  >
                    📍 {candidate.location}
                  </Typography>
                </div>

                <div className="flex gap-2">
                  {candidate.badges.map((badge, index) => (
                    <Chip
                      key={index}
                      value={badge.title}
                      color={
                        badge.color === 'green' ? 'green' :
                        badge.color === 'purple' ? 'purple' :
                        'pink'
                      }
                      size="sm"
                    />
                  ))}
                </div>
              </div>
            </div>
            
            <Button color="purple" size="sm">
              Edit Profile
            </Button>
          </div>

          {/* Contact Details and Stats */}
          <div className="grid grid-cols-2 gap-8 mb-8">
            <div>
              <Typography
                variant="small"
                color="blue-gray"
                className="font-medium mb-4"
              >
                CONTACT DETAILS
              </Typography>
              
              <div className="space-y-3">
                <Typography
                  variant="small"
                  className="flex items-center gap-2"
                >
                  📧 {candidate.email}
                </Typography>
                <Typography
                  variant="small"
                  className="flex items-center gap-2"
                >
                  📞 {candidate.phone}
                </Typography>
                
                {/* Social Links */}
                <div className="flex items-center gap-4 mt-4">
                  <Typography variant="small" color="blue-gray">
                    SOCIAL LINKS
                  </Typography>
                  <div className="flex gap-3">
                    {candidate.socialLinks.map((social, index) => (
                      <Button
                        key={index}
                        variant="text"
                        size="sm"
                        className="p-2"
                        href={social.url}
                        target="_blank"
                      >
                        {social.name === "Instagram" && "📸"}
                        {social.name === "LinkedIn" && "💼"}
                        {social.name === "Twitter" && "🐦"}
                        {social.name === "GitHub" && "💻"}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Languages */}
                <div className="flex items-center gap-4 mt-4">
                  <Typography variant="small" color="blue-gray">
                    LANGUAGES SPOKEN
                  </Typography>
                  <div className="flex gap-2">
                    {candidate.languages.map((lang, index) => (
                      <Avatar
                        key={index}
                        size="sm"
                        variant="circular"
                        alt={lang.name}
                        src={`https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.5.0/flags/4x3/${lang.code}.svg`}
                        className="border border-blue-gray-50 bg-blue-gray-50/50"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <Typography
                variant="small"
                color="blue-gray"
                className="font-medium mb-4"
              >
                AGENT STATS
              </Typography>
              <div className="grid grid-cols-3 gap-4">
                <Card className="bg-purple-500">
                  <CardBody className="p-4">
                    <Typography variant="h4" color="white">
                      {candidate.stats.problems}
                    </Typography>
                    <Typography variant="small" color="white">
                      PROBLEMS
                    </Typography>
                  </CardBody>
                </Card>
                <Card className="bg-purple-500">
                  <CardBody className="p-4">
                    <Typography variant="h4" color="white">
                      {candidate.stats.offMarket}
                    </Typography>
                    <Typography variant="small" color="white">
                      OFF MARKET
                    </Typography>
                  </CardBody>
                </Card>
                <Card className="bg-purple-500">
                  <CardBody className="p-4">
                    <Typography variant="h4" color="white">
                      {candidate.stats.management}
                    </Typography>
                    <Typography variant="small" color="white">
                      MANAGEMENT
                    </Typography>
                  </CardBody>
                </Card>
              </div>
            </div>
          </div>

          {/* Experience */}
          <div>
            <Typography
              variant="small"
              color="blue-gray"
              className="font-medium mb-4"
            >
              EXPERIENCE
            </Typography>
            <div className="space-y-6">
              {candidate.experience.map((exp, index) => (
                <div key={index} className="flex gap-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="w-20"
                  >
                    {exp.year}
                  </Typography>
                  <div>
                    <Typography
                      variant="h6"
                      color="blue-gray"
                      className="mb-1"
                    >
                      {exp.role}
                    </Typography>
                    <Typography variant="small">
                      {exp.company}
                    </Typography>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="mb-1"
                    >
                      {exp.location}
                    </Typography>
                    <Typography
                      variant="small"
                      color="gray"
                    >
                      {exp.description}
                    </Typography>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default CandidateProfile;