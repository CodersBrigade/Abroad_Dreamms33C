import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell } from 'recharts';
import axios from 'axios';

const CountryBarChart = () => {
    const [countryData, setCountryData] = useState([]);

    useEffect(() => {
        // Fetch data from the backend endpoint
        fetchData();
    }, []);

    const fetchData = () => {
        axios.get('http://localhost:8080/institution/getAll', {
            headers: { Authorization: "Bearer " + localStorage.getItem("accessToken") }
        })
            .then(response => {
                const countryCounts = countInstitutionsByCountry(response.data);
                setCountryData(countryCounts);
            })
            .catch(error => {
                console.error('Error fetching country data:', error);
            });
    };

    const countInstitutionsByCountry = (institutions) => {
        const countryCounts = {};

        institutions.forEach(institution => {
            const country = institution.country || 'Unknown'; // Assuming 'Unknown' as default for null or undefined values
            countryCounts[country] = (countryCounts[country] || 0) + 1;
        });

        return Object.entries(countryCounts).map(([country, countryName], index) => ({ country, countryName, color: getRandomColor(index) }));
    };

    const getRandomColor = (index) => {
        // Replace this with your logic for generating random colors
        const colors = ['#FFA500', '#4CAF50', '#FF0000', '#00FFFF', '#800080', '#FFFF00', '#008080'];
        return colors[index % colors.length];
    };

    if (countryData.length === 0) {
        // Show a loading indicator or some other feedback when countryData is empty
        return <div>No Data To Display! It will display upon populating data.</div>;
    }

    return (
        <BarChart width={800} height={400} data={countryData} barCategoryGap={0}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="country" label={{ value: 'Countries', position: 'insideBottom', offset: -10 }} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="countryName" fill="black" barSize={30}>
                {countryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
            </Bar>
        </BarChart>
    );
};

export default CountryBarChart;
