import React, { useState } from 'react';
import {
    User,
    Mail,
    Phone,
    Calendar,
    GraduationCap,
    Briefcase,
    Building,
    Send
} from 'lucide-react';

function UpdateCandidate() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        dateOfBirth: '',
        education: [
            {
                institution: '',
                qualification: '',
                contactPerson: '',
                contactEmail: '',
                contactPhone: '',
            },
            {
                institution: '',
                qualification: '',
                contactPerson: '',
                contactEmail: '',
                contactPhone: '',
            }
        ],
        employers: [
            {
                companyName: '',
                position: '',
                contactPerson: '',
                contactEmail: '',
                contactPhone: '',
            },
            {
                companyName: '',
                position: '',
                contactPerson: '',
                contactEmail: '',
                contactPhone: '',
            }
        ]
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleEducationChange = (index, field, value) => {
        setFormData(prev => {
            const newEducation = [...prev.education];
            newEducation[index] = { ...newEducation[index], [field]: value };
            return { ...prev, education: newEducation };
        });
    };

    const handleEmployerChange = (index, field, value) => {
        setFormData(prev => {
            const newEmployers = [...prev.employers];
            newEmployers[index] = { ...newEmployers[index], [field]: value };
            return { ...prev, employers: newEmployers };
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white shadow-2xl rounded-2xl p-8">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold text-gray-900">Candidate Information Form</h1>
                        <div className="mt-2 text-xl font-semibold text-blue-600">by Authenticred</div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Personal Information */}
                        <div className="bg-gray-50/50 p-8 rounded-xl">
                            <h2 className="text-xl font-semibold text-gray-900 mb-6">Personal Information</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <User className="h-5 w-5 text-blue-500" />
                                    </div>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        placeholder="First Name"
                                        required
                                        className="pl-12 w-full py-3 bg-white rounded-lg border-0 ring-1 ring-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                                    />
                                </div>

                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <User className="h-5 w-5 text-blue-500" />
                                    </div>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        placeholder="Last Name"
                                        required
                                        className="pl-12 w-full py-3 bg-white rounded-lg border-0 ring-1 ring-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                                    />
                                </div>

                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Mail className="h-5 w-5 text-blue-500" />
                                    </div>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Email Address"
                                        required
                                        className="pl-12 w-full py-3 bg-white rounded-lg border-0 ring-1 ring-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                                    />
                                </div>

                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Phone className="h-5 w-5 text-blue-500" />
                                    </div>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="Phone Number"
                                        required
                                        className="pl-12 w-full py-3 bg-white rounded-lg border-0 ring-1 ring-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                                    />
                                </div>

                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Calendar className="h-5 w-5 text-blue-500" />
                                    </div>
                                    <input
                                        type="date"
                                        name="dateOfBirth"
                                        value={formData.dateOfBirth}
                                        onChange={handleChange}
                                        required
                                        className="pl-12 w-full py-3 bg-white rounded-lg border-0 ring-1 ring-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Education Details */}
                        <div className="bg-gray-50/50 p-8 rounded-xl">
                            <h2 className="text-xl font-semibold text-gray-900 mb-6">Education Details</h2>
                            {[0, 1].map((index) => (
                                <div key={`education-${index}`} className="mb-8 last:mb-0">
                                    <h3 className="text-lg font-medium text-gray-700 mb-4">
                                        {index === 0 ? 'Most Recent Education' : 'Previous Education'}
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                <GraduationCap className="h-5 w-5 text-blue-500" />
                                            </div>
                                            <input
                                                type="text"
                                                value={formData.education[index].institution}
                                                onChange={(e) => handleEducationChange(index, 'institution', e.target.value)}
                                                placeholder="Institution Name"
                                                required
                                                className="pl-12 w-full py-3 bg-white rounded-lg border-0 ring-1 ring-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                                            />
                                        </div>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                value={formData.education[index].qualification}
                                                onChange={(e) => handleEducationChange(index, 'qualification', e.target.value)}
                                                placeholder="Qualification"
                                                required
                                                className="pl-4 w-full py-3 bg-white rounded-lg border-0 ring-1 ring-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                                            />
                                        </div>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                <User className="h-5 w-5 text-blue-500" />
                                            </div>
                                            <input
                                                type="text"
                                                value={formData.education[index].contactPerson}
                                                onChange={(e) => handleEducationChange(index, 'contactPerson', e.target.value)}
                                                placeholder="Contact Person"
                                                required
                                                className="pl-12 w-full py-3 bg-white rounded-lg border-0 ring-1 ring-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                                            />
                                        </div>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                <Mail className="h-5 w-5 text-blue-500" />
                                            </div>
                                            <input
                                                type="email"
                                                value={formData.education[index].contactEmail}
                                                onChange={(e) => handleEducationChange(index, 'contactEmail', e.target.value)}
                                                placeholder="Contact Email"
                                                required
                                                className="pl-12 w-full py-3 bg-white rounded-lg border-0 ring-1 ring-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                                            />
                                        </div>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                <Phone className="h-5 w-5 text-blue-500" />
                                            </div>
                                            <input
                                                type="tel"
                                                value={formData.education[index].contactPhone}
                                                onChange={(e) => handleEducationChange(index, 'contactPhone', e.target.value)}
                                                placeholder="Contact Phone"
                                                required
                                                className="pl-12 w-full py-3 bg-white rounded-lg border-0 ring-1 ring-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Previous Employment */}
                        <div className="bg-gray-50/50 p-8 rounded-xl">
                            <h2 className="text-xl font-semibold text-gray-900 mb-6">Previous Employment</h2>
                            {[0, 1].map((index) => (
                                <div key={`employer-${index}`} className="mb-8 last:mb-0">
                                    <h3 className="text-lg font-medium text-gray-700 mb-4">
                                        {index === 0 ? 'Most Recent Employer' : 'Previous Employer'}
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                <Building className="h-5 w-5 text-blue-500" />
                                            </div>
                                            <input
                                                type="text"
                                                value={formData.employers[index].companyName}
                                                onChange={(e) => handleEmployerChange(index, 'companyName', e.target.value)}
                                                placeholder="Company Name"
                                                required
                                                className="pl-12 w-full py-3 bg-white rounded-lg border-0 ring-1 ring-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                                            />
                                        </div>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                <Briefcase className="h-5 w-5 text-blue-500" />
                                            </div>
                                            <input
                                                type="text"
                                                value={formData.employers[index].position}
                                                onChange={(e) => handleEmployerChange(index, 'position', e.target.value)}
                                                placeholder="Position Held"
                                                required
                                                className="pl-12 w-full py-3 bg-white rounded-lg border-0 ring-1 ring-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                                            />
                                        </div>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                <User className="h-5 w-5 text-blue-500" />
                                            </div>
                                            <input
                                                type="text"
                                                value={formData.employers[index].contactPerson}
                                                onChange={(e) => handleEmployerChange(index, 'contactPerson', e.target.value)}
                                                placeholder="Contact Person"
                                                required
                                                className="pl-12 w-full py-3 bg-white rounded-lg border-0 ring-1 ring-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                                            />
                                        </div>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                <Mail className="h-5 w-5 text-blue-500" />
                                            </div>
                                            <input
                                                type="email"
                                                value={formData.employers[index].contactEmail}
                                                onChange={(e) => handleEmployerChange(index, 'contactEmail', e.target.value)}
                                                placeholder="Contact Email"
                                                required
                                                className="pl-12 w-full py-3 bg-white rounded-lg border-0 ring-1 ring-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                                            />
                                        </div>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                <Phone className="h-5 w-5 text-blue-500" />
                                            </div>
                                            <input
                                                type="tel"
                                                value={formData.employers[index].contactPhone}
                                                onChange={(e) => handleEmployerChange(index, 'contactPhone', e.target.value)}
                                                placeholder="Contact Phone"
                                                required
                                                className="pl-12 w-full py-3 bg-white rounded-lg border-0 ring-1 ring-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="inline-flex items-center px-8 py-4 border-0 text-base font-medium rounded-lg shadow-lg text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                            >
                                <Send className="h-5 w-5 mr-2" />
                                Submit Information
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default UpdateCandidate;