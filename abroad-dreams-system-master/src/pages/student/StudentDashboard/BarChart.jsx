// import * as React from "react";
// import { BarChart } from "@mui/x-charts/BarChart";
//
// export default function BasicBars() {
//   return (
//     <div className="d-flex flex-column">
//       <BarChart
//         xAxis={[{ scaleType: "band", data: ["group A", "group B", "group C"] }]}
//         series={[{ data: [4, 3, 5] }, { data: [1, 6, 3] }, { data: [2, 5, 6] }]}
//         width={500}
//         height={300}
//       />
//     </div>
//   );
// }
// BarChartComponent.jsx
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
// import AdminHeader from "../Components/Header.jsx";
// import AdminSidebar from "../Components/Sidebar.jsx";
const BasicBars = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
// Fetch data from Spring Boot backend
        axios.get('http://your-spring-boot-api-endpoint/data')
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []); // Empty dependency array ensures the effect runs only once on component mount
// Demo data if no data is fetched
    const demoData = [
        { name: 'USA', value: 20 },
        { name: 'AUS', value: 50 },
        { name: 'Others', value: 30 },
    ];
    if (loading) {
        return <p>Loading...</p>;
    }
// Single color for all bars
    const singleColor = 'blue';
    return (
        <>


            <BarChart width={400} height={300} data={data.length ? data : demoData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill={singleColor} />
            </BarChart>
        </>
    );
};
export default BasicBars;
