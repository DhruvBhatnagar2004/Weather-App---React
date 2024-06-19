// src/pages/Weather.js
import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const Weather = () => {
    const [weather, setWeather] = useState(null);
    const [searchParams, setSearchParams] = useSearchParams();
    const [city, setCity] = useState(searchParams.get('city') || '');
    const [submitted, setSubmitted] = useState(false);
    
    const getWeather = async (cityName) => {
        try {
            const response = await fetch(
                `https://api.weatherapi.com/v1/current.json?key=8d8d66346fc943fda3292623232008&q=${cityName}&aqi=no`
              );
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log('API response:', data); // Log the response for debugging
            setWeather(data);
        } catch (error) {
            console.error("Error fetching the weather data", error);
        }
    };

    const handleCityChange = (e) => {
        const newCity = e.target.value;
        setCity(newCity);
    };

    const handleSubmit = () => {
        getWeather(city);
        setSearchParams({ city: city });
        setSubmitted(true); // Mark submitted as true after clicking submit
    };

    return (
        <div>
            <h1>Weather Page</h1>
            <input 
                type="text" 
                value={city} 
                onChange={handleCityChange} 
                placeholder="Enter city name" 
            />
            <button onClick={handleSubmit}>Get Weather</button>
            {submitted && weather !== null && (
                <div>
                    <h2>{weather.name}</h2>
                    <p>Temperature: {weather.current ? weather.current.temp_c : 'N/A'}°C</p>
                    <p>Humidity: {weather.current ? weather.current.humidity : 'N/A'}</p>
                </div>
            )}
        </div>
    );
};

export default Weather;


