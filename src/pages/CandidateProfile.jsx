import React, { useContext, useEffect, useState } from 'react';
import { User, GraduationCap, Briefcase, Mail, Phone, Calendar, CheckCircle2, XCircle } from 'lucide-react';
import { api } from '../services/api';
import { useParams } from 'react-router-dom';
import { user } from '../constants/config';
import { DataContext } from '../context/DataProvider';

function CandidateProfile() {
    const intialCandidate = {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        dateOfBirth: '',
        educations: [],
        previousEmployers: []
    };

    const {account} = useContext(DataContext)

    const { id } = useParams();
    const [candidate, setCandidate] = useState(intialCandidate);

    const VerificationStatus = ({ isVerified }) => (
        <div className={`flex items-center gap-1 ${isVerified ? 'text-green-600' : 'text-red-500'}`}>
            {isVerified ? (
                <>
                    <CheckCircle2 size={16} />
                    <span className="text-sm font-medium">Verified</span>
                </>
            ) : (
                <>
                    <XCircle size={16} />
                    <span className="text-sm font-medium">Not Verified</span>
                </>
            )}
        </div>
    );

    const EmptyState = ({ title, message }) => (
        <div className="p-6 bg-gray-50 rounded-lg text-center">
            <p className="text-lg font-semibold text-gray-700 mb-2">{title}</p>
            <p className="text-gray-600">{message}</p>
        </div>
    );

    useEffect(() => {
        const getCandidate = async () => {
            const userId = account.id;
            const url = `/users/${userId}/candidates/${id}`
            const response = await api.get(url);
            console.log(response.data);
            setCandidate(response.data.data);
        }

        getCandidate();
    }, [])

    return (
        <div className="h-full bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white shadow-xl rounded-lg overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-gray-700 to-gray-900 px-8 py-10 text-white">
                        <div className="flex items-center gap-4">
                            <User size={48} className="text-white" />
                            <div>
                                <h1 className="text-3xl font-bold">{candidate.firstName} {candidate.lastName}</h1>
                                <p className="text-gray-300">Professional Profile</p>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-8">
                        {/* Personal Information */}
                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                                <User className="text-gray-700" />
                                Personal Information
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="flex items-center gap-2">
                                    <Mail className="text-gray-700" size={20} />
                                    <div>
                                        <div className="text-sm text-gray-600">Email</div>
                                        <div className="text-gray-900">{candidate.email}</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Phone className="text-gray-700" size={20} />
                                    <div>
                                        <div className="text-sm text-gray-600">Phone</div>
                                        <div className="text-gray-900">{candidate.mobile_number}</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar className="text-gray-700" size={20} />
                                    <div>
                                        <div className="text-sm text-gray-600">Date of Birth</div>
                                        <div className="text-gray-900">{new Date(candidate.dateOfBirth).toLocaleDateString()}</div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Education */}
                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                                <GraduationCap className="text-gray-700" />
                                Education
                            </h2>
                            {!candidate.educations ? (
                                <EmptyState
                                    title="No Education Information"
                                    message="The candidate has not added any education details yet."
                                />
                            ) : (
                                <div className="space-y-6">
                                    {candidate.educations.map((edu, index) => (
                                        <div key={index} className="p-6 bg-gray-50 rounded-lg">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div>
                                                    <div className="flex items-center justify-between mb-2">
                                                        <h3 className="font-semibold text-lg text-gray-800">{edu.institution}</h3>
                                                        <VerificationStatus isVerified={edu.isVerified} />
                                                    </div>
                                                    <p className="text-gray-700 mt-1">{edu.qualification}</p>
                                                </div>
                                                <div className="space-y-2">
                                                    <p className="text-gray-700">
                                                        <span className="font-medium">Contact:</span> {edu.contactPerson}
                                                    </p>
                                                    <p className="text-gray-700">
                                                        <span className="font-medium">Email:</span> {edu.contactEmail}
                                                    </p>
                                                    <p className="text-gray-700">
                                                        <span className="font-medium">Phone:</span> {edu.contactPhone}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </section>

                        {/* Employment History */}
                        <section>
                            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                                <Briefcase className="text-gray-700" />
                                Employment History
                            </h2>
                            {!candidate.previousEmployers ? (
                                <EmptyState
                                    title="No Employment History"
                                    message="The candidate has not added any employment details yet."
                                />
                            ) : (
                                <div className="space-y-6">
                                    {candidate.previousEmployers.map((emp, index) => (
                                        <div key={index} className="p-6 bg-gray-50 rounded-lg">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div>
                                                    <div className="flex items-center justify-between mb-2">
                                                        <h3 className="font-semibold text-lg text-gray-800">{emp.companyName}</h3>
                                                        <VerificationStatus isVerified={emp.isVerified} />
                                                    </div>
                                                    <p className="text-gray-700 mt-1">{emp.position}</p>
                                                </div>
                                                <div className="space-y-2">
                                                    <p className="text-gray-700">
                                                        <span className="font-medium">Contact:</span> {emp.contactPerson}
                                                    </p>
                                                    <p className="text-gray-700">
                                                        <span className="font-medium">Email:</span> {emp.contactEmail}
                                                    </p>
                                                    <p className="text-gray-700">
                                                        <span className="font-medium">Phone:</span> {emp.contactPhone}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CandidateProfile;