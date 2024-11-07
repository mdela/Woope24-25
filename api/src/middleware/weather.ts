// Coordinates for Sitting Bull
// 46.0853,-100.6746
// Weather.gov API Call
// https://api.weather.gov/points/{point x},{point y}
// Forecast Hourly API Call
// https://api.weather.gov/gridpoints/City/{x},{y}/forecast/hourly
import axios from 'axios';
interface ForecastDictionary {
    Day: string;
    Temp: number;
    TempUnit: string;
    Description: string;
}

/**
 * Retrieves a 7-day weather forecast for a specific location using the National Weather Service API.
 *
 * This function makes two sequential requests:
 * 1. Retrieves the forecast endpoint URL for the given coordinates.
 * 2. Fetches detailed forecast data and processes it into a more readable format.
 *
 * @returns {Promise<ForecastDictionary[]>} A promise that resolves to an array of forecast objects, each containing:
 * - `Day`: The name of the day or time period.
 * - `Temp`: The forecasted temperature.
 * - `TempUnit`: The unit of temperature (usually Fahrenheit).
 * - `Description`: A short summary of the weather forecast.
 *
 * @throws {Error} Throws an error if any of the API calls fail, providing a generic message, "Failed to retrieve weather data".
 *
 * @example
 * getWeatherData()
 *   .then(forecast => console.log('Weather Forecast:', forecast))
 *   .catch(error => console.error('Error fetching weather data:', error));
 */
const getWeatherData = (): Promise<ForecastDictionary[]> => {
    const point_x = 40.0853; // Hard-coded coordinates
    const point_y = -100.6746;
    const weather_api = 'https://api.weather.gov/points/';
    const initial_api = `${weather_api}${point_x},${point_y}`;
    return axios.get(initial_api)
        .then(response => {
            const forecast_api = response.data.properties.forecast;
            return axios.get(forecast_api);
        })
        .then(forecast_response => {
            let forecast = forecast_response.data.properties.periods;
            let forecast_return: ForecastDictionary[] = [];
            for (let i = 0; i < forecast.length; i++) {
                let dictionary: ForecastDictionary = {
                    Day: forecast[i].name,
                    Temp: forecast[i].temperature,
                    TempUnit: forecast[i].temperatureUnit,
                    Description: forecast[i].shortForecast,
                };
                forecast_return.push(dictionary);
            }
            return forecast_return;
        })
        .catch(error => {
            console.error(error);
            throw new Error('Failed to retrieve weather data'); // Throw an error to be handled by the caller
        });
}
export default getWeatherData; // Export the function