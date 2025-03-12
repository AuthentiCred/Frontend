import React from 'react';
import {
    Card,
    CardBody,
    CardHeader,
    Typography
} from "@material-tailwind/react";
import { motion } from "framer-motion";
import { ArrowDownCircle } from 'lucide-react';

const About = () => {
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

    const processSteps = [
        {
            title: "Job Posting Creation",
            content: "HR professionals create job postings through the system. The job posting details are securely stored on the blockchain and IPFS to ensure data integrity."
        },
        {
            title: "Resume Submission",
            content: "Candidates submit their resumes and credentials through a unique application link. The resume is stored on IPFS, and its hash is recorded on the blockchain for immutability."
        },
        {
            title: "Resume Analysis",
            content: "The system sends the resume to the Machine Learning Engine, which analyzes the content and matches it against the job requirements. Candidates are ranked based on their suitability."
        },
        {
            title: "Candidate Shortlisting",
            content: "The platform automatically shortlists candidates based on the analysis results. HR professionals can review the shortlisted candidates and make informed hiring decisions."
        },
        {
            title: "Audit Trail",
            content: "Every action taken during the recruitment process is recorded on the blockchain, providing a transparent and immutable audit trail for compliance and verification purposes."
        }
    ];

    return (
        <motion.div
            className="p-6 max-w-6xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
        >
            <motion.div
                className="text-center mb-12"
                {...fadeIn}
            >
                <Typography variant="h1" className="text-4xl font-bold mb-4 text-gray-900">
                    AuthentiCred
                </Typography>
                <Typography variant="paragraph" className="text-gray-600 text-lg">
                    Welcome to the Blockchain-based Resume Verification Platform! Our project aims to revolutionize the recruitment process by leveraging blockchain technology to ensure transparency, security, and efficiency in resume verification.
                </Typography>
            </motion.div>

            <motion.div
                variants={staggerContainer}
                initial="initial"
                animate="animate"
                className="space-y-8"
            >
                {processSteps.map((step, index) => (
                    <motion.div
                        key={index}
                        variants={fadeIn}
                        className="relative"
                    >
                        <Card className="bg-white border border-gray-200 shadow-lg">
                            <CardHeader
                                floated={false}
                                className="bg-gray-800 p-4 relative overflow-hidden"
                            >
                                <motion.div
                                    className="absolute inset-0 bg-gray-600"
                                    initial={{ x: '-100%' }}
                                    animate={{ x: '100%' }}
                                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                    style={{ opacity: 0.2 }}
                                />
                                <Typography variant="h3" className="text-xl font-bold text-white relative z-10">
                                    {step.title}
                                </Typography>
                            </CardHeader>
                            <CardBody className="p-6">
                                <Typography className="text-gray-600">
                                    {step.content}
                                </Typography>
                            </CardBody>
                        </Card>
                        
                        {index < processSteps.length - 1 && (
                            <div className="absolute left-1/2 -bottom-8 transform -translate-x-1/2 z-10">
                                <motion.div
                                    animate={{ y: [0, 5, 0] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                >
                                    <ArrowDownCircle className="w-6 h-6 text-blue-500" />
                                </motion.div>
                            </div>
                        )}
                    </motion.div>
                ))}
            </motion.div>

            <motion.div
                variants={fadeIn}
                initial="initial"
                animate="animate"
                className="mt-16"
            >
                <Card className="bg-white border border-gray-200 shadow-lg">
                    <CardHeader floated={false} className="bg-gray-800 p-4">
                        <Typography variant="h2" className="text-2xl font-bold text-white">
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
                                    <Typography className="text-gray-600">
                                        {feature}
                                    </Typography>
                                </motion.li>
                            ))}
                        </motion.ul>
                    </CardBody>
                </Card>
            </motion.div>
        </motion.div>
    );
};

export default About;