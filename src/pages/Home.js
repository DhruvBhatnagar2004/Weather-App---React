// src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <h1>Welcome to the Weather App</h1>
            <Link to="/weather">Go to Weather Page</Link>
        </div>
    );
};

export default Home;
