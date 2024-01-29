import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import axios from 'axios';

const ApplicationDataChart = () => {
    const [applicationData, setApplicationData] = useState([]);

    useEffect(() => {
        // Fetch data from the backend endpoint
        fetchData();
    }, []);

    // Function to fetch data from the backend
    const fetchData = () => {
        axios.get('http://localhost:8080/applications/all', {
            headers: { Authorization: "Bearer " + localStorage.getItem("accessToken") }
        })
            .then(response => {
                const applicationCounts = countApplications(response.data);
                setApplicationData(applicationCounts);
            })
            .catch(error => {
                console.error('Error fetching application data:', error);
            });
    };

    // Function to count the occurrences of each application status
    const countApplications = (applications) => {
        const applicationCounts = {
            'Pending': 0,
            'Approved': 0,
            'Processing': 0,
            // Add more status types as needed
        };

        applications.forEach(application => {
            const status = application.status || 'Pending'; // Assuming 'Pending' as default for null or undefined values
            applicationCounts[status]++;
        });

        return Object.entries(applicationCounts).map(([status, count]) => ({ status, count }));
    };

    // Custom colors for each status
    const statusColors = {
        'Pending': '#FFA500',
        'Approved': '#4CAF50',
        'Processing': '#FF0000',
        // Add more status types as needed
    };

    if (applicationData.length === 0) {
        // Show a loading indicator or some other feedback when applicationData is empty
        return <div>Loading...</div>;
    }

    return (
        <PieChart width={400} height={300}>
            <Pie
                data={applicationData}
                dataKey="count"
                nameKey="status"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
            >
                {Object.entries(statusColors).map(([status, color], index) => (
                    <Cell key={`cell-${index}`} fill={color} name={applicationData.status}/>
                ))}
            </Pie>
            <Tooltip />
        </PieChart>
    );
};

export default ApplicationDataChart;
