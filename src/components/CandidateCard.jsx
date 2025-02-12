import { CheckCircle, XCircle } from 'lucide-react';

export const CandidateCard = ({ firstName, lastName, email, isVerified, avatar }) => {
    return (
        <div className="bg-white cursor-pointer rounded-lg shadow-md p-6 flex items-center space-x-6 hover:shadow-lg transition-shadow">
            <img
                src={avatar}
                alt={firstName}
                className="w-20 h-20 rounded-full object-cover"
            />
            <div className="flex-grow">
                <div>
                <h3 className="text-xl font-semibold text-gray-800">{firstName} {lastName}</h3>
                </div>
                <p className="text-gray-600">{email}</p>
            </div>
            <div className="flex items-center">
                {isVerified ? (
                    <div className="flex items-center text-green-600">
                        <CheckCircle className="w-6 h-6 mr-2" />
                        <span className="font-medium">Verified</span>
                    </div>
                ) : (
                    <div className="flex items-center text-red-500">
                        <XCircle className="w-6 h-6 mr-2" />
                        <span className="font-medium">Not Verified</span>
                    </div>
                )}
            </div>
        </div>
    );
}