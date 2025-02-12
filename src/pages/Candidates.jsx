import React, { useContext, useEffect, useState } from 'react';
import { CandidateCard } from '../components/CandidateCard'
import { api } from '../services/api';
import profile from '../assets/profile.png'
import { Link } from 'react-router-dom';
import { DataContext } from '../context/DataProvider';


function Candidates() {
    const [candidatesList, setCandidatesList] = useState([]);
    const {account} = useContext(DataContext)

    useEffect(() => {
        const getAllCandidates = async () => {
            const userId = account.id;
            const url = `/users/${userId}/candidates`
            const response = await api.get(url);
            setCandidatesList(response.data.data);
        }

        getAllCandidates();
    }, [])

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-xl font-bold text-gray-900 mb-8 text-center">
                    Candidate List
                </h1>
                <div className="space-y-6">
                    {candidatesList.length > 0 ? <>
                        {candidatesList.map((candidate) => (
                            <Link to={`/candidates/${candidate.id}`} key = {candidate.id}>
                                <CandidateCard
                                    firstName={candidate.firstName}
                                    lastName={candidate.lastName}
                                    email={candidate.email}
                                    isVerified={candidate.isVerified}
                                    avatar={profile}
                                />
                            </Link>
                        ))}
                    </> :
                        <div>
                            <h3>No candidates</h3>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default Candidates;
