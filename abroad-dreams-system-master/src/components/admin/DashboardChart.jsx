import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

const DashboardChart = ({ institutions, courses, students, instructors }) => {
    // Assuming 'name' and 'uv' are the relevant keys in your data
    const data = [
        { name: 'Institutions', uv: institutions.length },
        { name: 'Courses', uv: courses.length },
        { name: 'Students', uv: students.length },
        { name: 'Instructors', uv: instructors.length },
        // Add more data points as needed
    ];

    const renderCustomAxisTick = ({ x, y, payload }) => {
        // You can customize the axis tick rendering based on your requirements
        return (
            <text x={x} y={y} dy={16} textAnchor="end" fill="#666">
                {payload.value}
            </text>
        );
    };

    return (
        <LineChart width={600} height={300} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <Line type="monotone" dataKey="uv" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="name" tick={renderCustomAxisTick} />
            <YAxis />
            <Tooltip />
        </LineChart>
    );
};

export default DashboardChart;
