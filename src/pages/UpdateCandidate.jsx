import { useEffect, useState } from 'react';
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
import { useParams } from 'react-router-dom';
import { api } from '../services/api';

function UpdateCandidate() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        mobile_number: '',
        dateOfBirth: '',
        educations: [
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
        previousEmployers: [
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

    const {user_id, id } = useParams();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleEducationChange = (index, field, value) => {
        setFormData(prev => {
            const newEducation = [...prev.educations];
            newEducation[index] = { ...newEducation[index], [field]: value };
            return { ...prev, educations: newEducation };
        });
    };

    const handleEmployerChange = (index, field, value) => {
        setFormData(prev => {
            const newEmployers = [...prev.previousEmployers];
            newEmployers[index] = { ...newEmployers[index], [field]: value };
            return { ...prev, previousEmployers: newEmployers };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior

        try {
            const url = `users/${user_id}/candidates/${id}`;

            // Check if dateOfBirth is valid
            let formattedDate;
            if (formData.dateOfBirth) {
                const date = new Date(formData.dateOfBirth);
                // Validate the date
                if (isNaN(date.getTime())) {
                    throw new Error('Invalid date format. Please enter a valid date.');
                }
                formattedDate = date.toISOString(); // Convert to ISO string for submission
            } else {
                throw new Error('Date of birth is required.'); // Handle empty date
            }

            console.log(formattedDate);

            // Prepare submission data
            const submissionData = {
                ...formData,
                dateOfBirth: formattedDate // Use the formatted date
            };

            // Make the API call to update the candidate
            const response = await api.patch(url, submissionData);
            if (response.data.success) {
                alert('You have updated your information successfully');
                // Optionally reset the form or redirect
                // setFormData(initialState); // Reset form if needed
            } else {
                // Handle case where the API response indicates failure
                alert('Failed to update candidate. Please check your input and try again.');
            }
        } catch (error) {
            console.error('Error updating candidate:', error);
            alert(`Failed to update candidate: ${error.message}`); // Provide specific error message
        }
    };

    useEffect(() => {
        const getCandidate = async () => {
            try {
                const url = `users/${user_id}/candidates/${id}`;
                const response = await api.get(url);
                const data = response.data.data; // Get the data from the response

                // Format date for input field
                setFormData({
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    mobile_number: data.mobile_number,
                    educations: formData.educations,
                    previousEmployers: formData.previousEmployers
                });

                console.log(formData);
            } catch (error) {
                console.error('Error fetching candidate:', error);
                alert('Failed to fetch candidate data. Please try again later.');
            }
        };

        getCandidate();
    }, [id]); // Add id as a dependency

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white shadow-2xl rounded-2xl p-8">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold text-gray-900">Update Candidate Information</h1>
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
                                        name="mobile_number"
                                        value={formData.mobile_number}
                                        onChange={handleChange}
                                        placeholder="Mobile Number"
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
                            {formData.educations.map((education, index) => (
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
                                                value={education.institution}
                                                onChange={(e) => handleEducationChange(index, 'institution', e.target.value)}
                                                placeholder="Institution Name"
                                                required
                                                className="pl-12 w-full py-3 bg-white rounded-lg border-0 ring-1 ring-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                                            />
                                        </div>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                value={education.qualification}
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
                                                value={education.contactPerson}
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
                                                value={education.contactEmail}
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
                                                value={education.contactPhone}
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
                            {formData.previousEmployers.map((employer, index) => (
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
                                                value={employer.companyName}
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
                                                value={employer.position}
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
                                                value={employer.contactPerson}
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
                                                value={employer.contactEmail}
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
                                                value={employer.contactPhone}
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
                                Update Candidate
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default UpdateCandidate;