import React from 'react';

const CandidateProfile = () => {
  const candidate = {
    id: "#5",
    name: "Ujwal Khairnar",
    location: "Pune, India",
    profilePic: "https://randomuser.me/api/portraits/men/4.jpg", // Dummy profile image link
    email: "ukkvlogs@gmail.com",
    phone: "594045984859",
    languages: [
      { code: "in", name: "Hindi" },
      { code: "gb", name: "English" },
      { code: "es", name: "Spanish" }
    ],
    socialLinks: [
      { name: "Instagram", url: "https://www.instagram.com", className: "text-pink-500 hover:text-pink-600" },
      { name: "LinkedIn", url: "https://www.linkedin.com", className: "text-blue-600 hover:text-blue-700" },
      { name: "Twitter", url: "https://www.twitter.com", className: "text-blue-400 hover:text-blue-500" },
      { name: "GitHub", url: "https://www.github.com", className: "text-gray-800 hover:text-gray-900" }
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
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-6">
        {/* Header Section */}
        <div className="flex justify-between items-start mb-8">
          <div className="flex items-start gap-6">
            <div className="relative">
              <img 
                src={candidate.profilePic}
                alt="Profile"
                className="w-24 h-24 rounded-lg object-cover bg-gray-100"
              />
            </div>
            
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-xl font-semibold">{candidate.id}</h2>
                <h1 className="text-2xl font-bold">{candidate.name}</h1>
              </div>
              
              <div className="flex items-center gap-4 text-gray-600 mb-4">
                <a 
                  href={candidate.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-purple-600"
                >
                  <span>🌐</span>
                  <span>Website</span>
                </a>
                <span className="flex items-center gap-1">
                  <span>📍</span>
                  <span>{candidate.location}</span>
                </span>
              </div>

              <div className="flex gap-2">
                {candidate.badges.map((badge, index) => (
                  <span
                    key={index}
                    className={`px-3 py-1 rounded-full text-xs font-medium
                      ${badge.color === 'green' ? 'bg-green-100 text-green-800' :
                      badge.color === 'purple' ? 'bg-purple-100 text-purple-800' :
                      'bg-pink-100 text-pink-800'}`}
                  >
                    {badge.title}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
            Edit Profile
          </button>
        </div>

        {/* Contact Details and Stats */}
        <div className="grid grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-4">CONTACT DETAILS</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span>📧</span>
                <span>{candidate.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <span>📞</span>
                <span>{candidate.phone}</span>
              </div>
              
              {/* Social Links */}
              <div className="flex items-center gap-4 mt-4">
                <h4 className="text-sm text-gray-500">SOCIAL LINKS</h4>
                <div className="flex gap-3">
                  {candidate.socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${social.className} w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100`}
                    >
                      {social.name === "Instagram" && <span>📸</span>}
                      {social.name === "LinkedIn" && <span>💼</span>}
                      {social.name === "Twitter" && <span>🐦</span>}
                      {social.name === "GitHub" && <span>💻</span>}
                    </a>
                  ))}
                </div>
              </div>

              {/* Languages */}
              <div className="flex items-center gap-4 mt-4">
                <h4 className="text-sm text-gray-500">LANGUAGES SPOKEN</h4>
                <div className="flex gap-2">
                  {candidate.languages.map((lang, index) => (
                    <span
                      key={index}
                      className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full"
                      title={lang.name}
                    >
                      <img
                        src={`https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.5.0/flags/4x3/${lang.code}.svg`}
                        alt={lang.name}
                        className="w-6 h-6 rounded"
                      />
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-4">AGENT STATS</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-purple-600 p-4 rounded-lg text-white">
                <div className="text-2xl font-bold">{candidate.stats.problems}</div>
                <div className="text-sm">PROBLEMS</div>
              </div>
              <div className="bg-purple-600 p-4 rounded-lg text-white">
                <div className="text-2xl font-bold">{candidate.stats.offMarket}</div>
                <div className="text-sm">OFF MARKET</div>
              </div>
              <div className="bg-purple-600 p-4 rounded-lg text-white">
                <div className="text-2xl font-bold">{candidate.stats.management}</div>
                <div className="text-sm">MANAGEMENT</div>
              </div>
            </div>
          </div>
        </div>

        {/* Experience */}
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-4">EXPERIENCE</h3>
          <div className="space-y-6">
            {candidate.experience.map((exp, index) => (
              <div key={index} className="flex gap-4">
                <div className="w-20 text-sm text-gray-500">{exp.year}</div>
                <div>
                  <h4 className="font-medium">{exp.role}</h4>
                  <p className="text-sm text-gray-600">{exp.company}</p>
                  <p className="text-sm text-gray-500">{exp.location}</p>
                  <p className="text-sm text-gray-600">{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateProfile;
