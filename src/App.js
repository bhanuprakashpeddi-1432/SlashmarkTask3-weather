// src/App.js
import React, { useState, useEffect } from 'react';
import { getWeather, getForecast } from './services/weatherService';
import './App.css';

const App = () => {
  const [location, setLocation] = useState('');
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [error, setError] = useState(null);

  const fetchWeatherData = async (loc) => {
    try {
      const weatherResponse = await getWeather(loc);
      setWeather(weatherResponse.data);
      const forecastResponse = await getForecast(loc);
      setForecast(forecastResponse.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching weather data:', error.response ? error.response.data : error.message);
      setError('Could not fetch weather data. Please try again.');
    }
  };

  useEffect(() => {
    const success = (position) => {
      const { latitude, longitude } = position.coords;
      fetchWeatherData(`${latitude},${longitude}`);
    };

    const error = () => {
      console.error('Error detecting location');
      setError('Could not detect location. Please enter a location manually.');
    };

    navigator.geolocation.getCurrentPosition(success, error);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchWeatherData(location);
  };

  return (
    <div className="App">
      <h1>Weather Forecast</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter location"
        />
        <button type="submit">Get Weather</button>
      </form>
      {error && <p className="error">{error}</p>}
      {weather && (
        <div className="weather-container">
          <h2>{weather.name}</h2>
          <p>{weather.weather[0].description}</p>
          <p>{weather.main.temp} °C</p>
        </div>
      )}
      {forecast && (
        <div className="forecast-container">
          <h2>5-Day Forecast</h2>
          <div className="forecast">
            {forecast.list.slice(0, 5).map((item) => (
              <div key={item.dt} className="forecast-item">
                <p>{new Date(item.dt * 1000).toLocaleDateString()}</p>
                <p>{item.weather[0].description}</p>
                <p>{item.main.temp} °C</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
