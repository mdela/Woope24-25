// Coordinates for Sitting Bull
// 46.0853,-100.6746

//Weather.gov API Call
//https://api.weather.gov/points/{point x},{point y}
//Forecast Hourly API Call
//https://api.weather.gov/gridpoints/City/{x},{y}/forecast/hourly


const axios = require('axios');
//structured this way so later, we can replace point_x and point_y with User-provided coordinates.
const point_x = 40.0853
const point_y = -100.6746
const weather_api = 'https://api.weather.gov/points/'
const initial_api = weather_api + String(point_x) + ',' + String(point_y);

let forecast_api = '';

axios.get(initial_api)
    .then(function (response){
        forecast_api = response.data.properties.forecast;
        return axios.get(forecast_api);
    })
    .then(function(forecast_response){
        let forecast = forecast_response.data.properties.periods;
        // at this point we are inside the periods section of the forecast api
        // for example: https://api.weather.gov/gridpoints/GLD/93,85/forecast
        //uncomment the for loop to test what to retrieve for weather widget

        // for (let i = 0; i < forecast.length; i++) {
        //     console.log(forecast[i].name);
        // }

    })
    .catch(function (error){
        console.log(error);
    });
