// Coordinates for Sitting Bull
// 46.0853,-100.6746

//Weather.gov API Call
//https://api.weather.gov/points/{point x},{point y}
//Forecast Hourly API Call
//https://api.weather.gov/gridpoints/City/{x},{y}/forecast/hourly

const { Client } = require('pg');
const axios = require('axios');

const config = {
    user: 'postgres',
    password: 'postgres',
    host: 'localhost',
    port: 5432,
    database: 'postgres'
  };


const client = new Client(config);

//structured this way so later, we can replace point_x and point_y with User-provided coordinates.
// x and y coordinates are pointing at SBC in ND.
const point_x = 40.0853
const point_y = -100.6746
const weather_api = 'https://api.weather.gov/points/'
const initial_api = weather_api + String(point_x) + ',' + String(point_y);

let forecast_api = '';
let forecast = []
axios.get(initial_api)
    .then(function (response){
        forecast_api = response.data.properties.forecast;
        return axios.get(forecast_api);
    })
    .then(function(forecast_response){
        forecast = forecast_response.data.properties.periods;
        client.connect()
        .then(() => {
            console.log('Connected to the database');
            // Create the table
            return client.query(`
            CREATE TABLE IF NOT EXISTS weather (
                id SERIAL PRIMARY KEY,
                day VARCHAR(255),
                startTime VARCHAR(255),
                endTime VARCHAR(255),
                temp INT,
                TempUnit VARCHAR(1),
                descr VARCHAR(255)
            )
            `);
        })
        .then(() => {

        //returns day/night forecast of the next 7 days with temp, temperature unit, and a short description currently.
        //if more data is needed check the json response in your own browser using this link: https://api.weather.gov/gridpoints/GLD/93,85/forecast
        //to add more data to the dictionary follow the original conventions and select which property is needed under properties>periods>0 in the json from the link above.
            console.log('Table "weather" created successfully');
            const insertPromise = client.query({
                text: `
                    INSERT INTO weather (day, startTime, endTime, temp, TempUnit, descr)
                    VALUES ($1, $2, $3, $4, $5, $6)
                `,
                values: [forecast[0].name, forecast[0].startTime, forecast[0].endTime, forecast[0].temperature, forecast[0].temperatureUnit, forecast[0].shortForecast]
            });
            return insertPromise;
        })
        .then(() => {
            console.log('Data inserted successfully');
            // Close the connection
            return client.end();
          })
          .catch(error => {
            console.error('Error:', error);
            // Close the connection
            client.end();
          });

          
        // at this point we are inside the periods section inside the properties of the forecast api
        // for example: https://api.weather.gov/gridpoints/GLD/93,85/forecast
        //uncomment the for loop to test what to retrieve for weather widget


        // for (let i = 0; i < forecast.length; i++) {
        //     let dictionary = {
        //         1: {Day: forecast[i].name},
        //         2: {Temp: forecast[i].temperature},
        //         3: {TempUnit: forecast[i].temperatureUnit},
        //         4: {Description: forecast[i].shortForecast},
        //         5: {StartTime: forecast[i].StartTime},
        //         6: {EndTime: forecast[i].EndTime}
        //     };
        //     forecast_return.push(dictionary);
        // }
        

    })
    .catch(function (error){
        return('error');
        console.log(error);
    });

