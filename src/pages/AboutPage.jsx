import React from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Typography
} from "@material-tailwind/react";
import { motion } from "framer-motion";

const AboutPage = () => {
  // Animation variants
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardHover = {
    scale: 1.02,
    transition: { duration: 0.2 }
  };

  return (
    <motion.div 
      className="p-6 max-w-6xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Main Header Section */}
      <motion.div 
        className="text-center mb-8"
        {...fadeIn}
      >
        <Typography variant="h1" className="text-4xl font-bold mb-4">
          About Our Project
        </Typography>
        <Typography variant="paragraph" className="text-gray-600 text-lg">
          Welcome to the Blockchain-based Resume Verification Platform! Our project aims to revolutionize the recruitment process by leveraging blockchain technology to ensure transparency, security, and efficiency in resume verification.
        </Typography>
      </motion.div>

      {/* Workflow Section */}
      <motion.div {...fadeIn}>
        <Card className="mb-8 hover:shadow-xl transition-shadow duration-300">
          <CardHeader floated={false} className="bg-blue-500 p-4 relative overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-blue-600"
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              style={{ opacity: 0.2 }}
            />
            <Typography variant="h2" color="white" className="text-2xl font-bold relative z-10">
              Workflow of the Platform
            </Typography>
          </CardHeader>
          <CardBody className="p-6">
            <motion.div 
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              {[
                {
                  title: "1. Job Posting Creation",
                  content: "HR professionals create job postings through the system. The job posting details are securely stored on the blockchain and IPFS to ensure data integrity."
                },
                {
                  title: "2. Resume Submission",
                  content: "Candidates submit their resumes and credentials through a unique application link. The resume is stored on IPFS, and its hash is recorded on the blockchain for immutability."
                },
                {
                  title: "3. Resume Analysis",
                  content: "The system sends the resume to the Machine Learning Engine, which analyzes the content and matches it against the job requirements. Candidates are ranked based on their suitability."
                },
                {
                  title: "4. Candidate Shortlisting",
                  content: "The platform automatically shortlists candidates based on the analysis results. HR professionals can review the shortlisted candidates and make informed hiring decisions."
                },
                {
                  title: "5. Audit Trail",
                  content: "Every action taken during the recruitment process is recorded on the blockchain, providing a transparent and immutable audit trail for compliance and verification purposes."
                }
              ].map((step, index) => (
                <motion.div
                  key={index}
                  variants={fadeIn}
                  whileHover={cardHover}
                >
                  <Card className="transform transition-all duration-300 hover:shadow-lg">
                    <CardBody className="p-4">
                      <Typography variant="h3" color="blue" className="text-xl font-bold mb-2">
                        {step.title}
                      </Typography>
                      <Typography variant="paragraph" className="text-gray-600">
                        {step.content}
                      </Typography>
                    </CardBody>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </CardBody>
        </Card>
      </motion.div>

      {/* Key Features Section */}
      <motion.div
        variants={fadeIn}
        initial="initial"
        animate="animate"
      >
        <Card className="mb-8 hover:shadow-xl transition-shadow duration-300">
          <CardHeader floated={false} className="bg-blue-500 p-4">
            <Typography variant="h2" color="white" className="text-2xl font-bold">
              Key Features
            </Typography>
          </CardHeader>
          <CardBody className="p-6">
            <motion.ul 
              className="space-y-4"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              {[
                "Enhanced Data Integrity: Blockchain ensures that resumes and job postings are tamper-proof.",
                "Transparency: Smart contracts provide a clear audit trail for all actions.",
                "Efficiency: Machine Learning automates resume analysis, speeding up the hiring process.",
                "Decentralized Storage: IPFS ensures secure and accessible storage of documents."
              ].map((feature, index) => (
                <motion.li 
                  key={index} 
                  className="flex items-start"
                  variants={fadeIn}
                  whileHover={{ x: 10 }}
                >
                  <span className="mr-2 text-blue-500">•</span>
                  <Typography variant="paragraph" className="text-gray-600">
                    {feature}
                  </Typography>
                </motion.li>
              ))}
            </motion.ul>
          </CardBody>
        </Card>
      </motion.div>

      {/* Conclusion Section */}
      <motion.div
        variants={fadeIn}
        initial="initial"
        animate="animate"
      >
        <Card className="hover:shadow-xl transition-shadow duration-300">
          <CardHeader floated={false} className="bg-blue-500 p-4">
            <Typography variant="h2" color="white" className="text-2xl font-bold">
              Conclusion
            </Typography>
          </CardHeader>
          <CardBody className="p-6">
            <Typography variant="paragraph" className="text-gray-600">
              Our Blockchain-based Resume Verification Platform is designed to address the challenges of traditional recruitment systems by providing a secure, transparent, and efficient solution. By leveraging blockchain, smart contracts, and machine learning, we aim to streamline the hiring process and ensure that only verified and qualified candidates are considered for job opportunities.
            </Typography>
          </CardBody>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default AboutPage;