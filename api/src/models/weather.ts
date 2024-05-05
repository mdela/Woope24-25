import { weather } from "../interfaces/weather";


const pool = require('../db');

export const createForecast = async (day: String, temp: Number, TempUnit: String, Description: string, startTime: string, endTime: string): Promise<weather> => {
    try {
        const response = await pool.query(
            'INSERT INTO weather (day, temp, TempUnit, Description, startTime, endTime) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [day, temp, TempUnit, Description, startTime, endTime]
        );
        return response.rows[0];
    } catch (error) {
        console.error('Error creating forecast', error);
        throw error;
    }
}
export const getForecast = async (day: string, temp: Number, TempUnit: String, Description: String, startTime: string, endTime: string): Promise<weather> => {
    const today = new Date();
    const date = `${today.getDate()}`;
    const { rows } = await pool.query(
        'SELECT * FROM weather WHERE day = $1', [date]
    );
}