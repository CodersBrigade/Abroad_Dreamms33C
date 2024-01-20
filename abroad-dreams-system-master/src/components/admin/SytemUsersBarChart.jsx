import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import axios from 'axios';

const SystemUsersBarChart = () => {
    const [userRolesData, setUserRolesData] = useState([]);

    useEffect(() => {
        // Fetch data from the backend endpoint
        fetchData();
    }, []);

    const fetchData = () => {
        axios.get('http://localhost:8080/system-user/getAll', {
            headers: { Authorization: "Bearer " + localStorage.getItem("accessToken") }
        })
            .then(response => {
                const roleCounts = countUserRoles(response.data);
                setUserRolesData(roleCounts);
            })
            .catch(error => {
                console.error('Error fetching user role data:', error);
            });
    };

    const countUserRoles = (users) => {
        const roleCounts = {};

        users.forEach(user => {
            const role = user.role || 'Unknown'; // Assuming 'Unknown' as default for null or undefined values
            roleCounts[role] = (roleCounts[role] || 0) + 1;
        });

        return Object.entries(roleCounts).map(([role, count]) => ({ role, count }));
    };

    if (userRolesData.length === 0) {
        // Show a loading indicator or some other feedback when userRolesData is empty
        return <div>Loading...</div>;
    }

    return (
        <BarChart width={600} height={400} data={userRolesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="role" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
    );
};

export default SystemUsersBarChart;
