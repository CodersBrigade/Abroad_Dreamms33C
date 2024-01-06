import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import axios from 'axios';

const GenderChart = () => {
    const [genderData, setGenderData] = useState([]);

    useEffect(() => {
        // Fetch data from the backend endpoint
        axios.get('http://localhost:8080/studentProfiles/getAll',
            {headers:{Authorization:"Bearer "+localStorage.getItem("accessToken")}})
            .then(response => {
                const genderCounts = countGenders(response.data);
                setGenderData(genderCounts);
            })
            .catch(error => {
                console.error('Error fetching gender data:', error);
            });
    }, []);

    // Function to count the occurrences of each gender
    const countGenders = (studentProfiles) => {
        const genderCounts = {
            Male: 1,
            Female: 1,
            Other: 0,
        };

        studentProfiles.forEach(profile => {
            // Assuming 'gender' is the relevant key in your data
            const gender = profile.gender || 'Other'; // Assuming 'Other' as default for null or undefined values
            genderCounts[gender]++;
        });

        return Object.entries(genderCounts).map(([gender, count]) => ({ gender, count }));
    };

    const renderCustomAxisTick = ({ x, y, payload }) => {
        return (
            <text x={x} y={y} dy={16} textAnchor="end" fill="#666">
                {payload.value}
            </text>
        );
    };

    return (
        <BarChart width={600} height={300} data={genderData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="gender" tick={renderCustomAxisTick} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" name="No. of Students" fill="#82B041" />
        </BarChart>
    );
};

export default GenderChart;
