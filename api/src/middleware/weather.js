import axios from 'axios';

// Coordinates for Sitting Bull
// 46.0853,-100.6746

//Weather.gov API Call
//https://api.weather.gov/points/{point x},{point y}
//Forecast Hourly API Call
//https://api.weather.gov/gridpoints/City/{x},{y}/forecast/hourly


const axios = require('axios');
const initial_api = 'https://api.weather.gov/points/40.0853,-100.6746';
let forecast_api = '';
let forecast = '';

axios.get(initial_api)
    .then(function (response){
        forecast_api = response.data.properties.forecast;
        return axios.get(forecast_api);
    })
    .then(function(forecast_response){
        forecast = forecast_response.data;
        console.log("Forecast:", forecast);
    })
    .catch(function (error){
        console.log(error);
    });
