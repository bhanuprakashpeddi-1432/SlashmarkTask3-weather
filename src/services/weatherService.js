// src/services/weatherService.js
import axios from 'axios';

const API_KEY = '33a365786474abfa14619d9954953bb7';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const getWeather = async (location) => {
  try {
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        q: location,
        units: 'metric',
        appid: API_KEY,
      },
    });
    console.log('Weather data:', response.data); // Log response data
    return response;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};

export const getForecast = async (location) => {
  try {
    const response = await axios.get(`${BASE_URL}/forecast`, {
      params: {
        q: location,
        units: 'metric',
        appid: API_KEY,
      },
    });
    console.log('Forecast data:', response.data); // Log response data
    return response;
  } catch (error) {
    console.error('Error fetching forecast data:', error);
    throw error;
  }
};
