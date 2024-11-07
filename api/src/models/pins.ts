import { Pin } from "../interfaces/pin";

const pool = require('../db');

/**
 * Creates a new pin with location data and optional metadata.
 *
 * This function inserts a new record into the `pins` table with the specified pin ID, user ID, 
 * geographical coordinates (longitude and latitude), and optional metadata. The inserted pin 
 * record is returned upon successful creation.
 *
 * @param {number} pin_id - The unique identifier for the new pin.
 * @param {number} user_id - The ID of the user creating the pin.
 * @param {number} longitude - The longitude coordinate of the pin's location.
 * @param {number} latitude - The latitude coordinate of the pin's location.
 * @param {string} [metadata] - Optional metadata associated with the pin, such as a description or additional info.
 * @returns {Promise<Pin>} A promise that resolves to the created pin object.
 * @throws {Error} Throws an error if the pin creation fails.
 *
 * @example
 * // Create a new pin for user ID 1 at specific coordinates with optional metadata
 * createPin(101, 1, -73.935242, 40.73061, "Favorite spot")
 *   .then(pin => console.log('Pin created:', pin))
 *   .catch(error => console.error('Error creating pin:', error));
 */
export const createPin = async (pin_id: number, user_id: number, longitude: number,
    latitude: number, metadata?: string): Promise<Pin> => {
    const { rows } = await pool.query(
        'INSERT INTO pins (pin_id, user_id, longitude, latitude, metadata) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [pin_id, user_id, longitude, latitude, metadata]
    );
    return rows[0];
}

/**
 * Retrieves all pins with their location data.
 *
 * This function queries the `pins` table to get the longitude and latitude of all pins. 
 * It returns an array of pins with only their location information.
 *
 * @returns {Promise<Pin[]>} A promise that resolves to an array of pins containing longitude and latitude.
 * @throws {Error} Throws an error if the query fails.
 *
 * @example
 * // Retrieve all pins with their locations
 * getPins()
 *   .then(pins => console.log('Pins:', pins))
 *   .catch(error => console.error('Error retrieving pins:', error));
 */
export const getPins = async (): Promise<Pin[]> => {
    const query = 'select longitude, latitude from pins';
    const { rows } = await pool.query(query, []);
    return rows;
}

/**
 * Retrieves a single pin by its ID with location data.
 *
 * This function queries the `pins` table to get the longitude and latitude of the specified pin.
 *
 * @param {number} pin_id - The unique identifier of the pin to retrieve.
 * @returns {Promise<Pin>} A promise that resolves to the pin with the specified ID.
 * @throws {Error} Throws an error if the pin retrieval fails.
 *
 * @example
 * // Retrieve pin with ID 1
 * getPin(1)
 *   .then(pin => console.log('Pin:', pin))
 *   .catch(error => console.error('Error retrieving pin:', error));
 */
export const getPin = async (pin_id: number): Promise<Pin> => {
    const query = 'select longitude, latitude from pins';
    const { rows } = await pool.query(query, [pin_id]);
    return rows[0];
}

/**
 * Updates the location and optional metadata of a specified pin.
 *
 * This function updates a pin's longitude, latitude, and metadata in the `pins` table.
 * Returns the updated pin data upon success.
 *
 * @param {number} pin_id - The unique identifier of the pin to update.
 * @param {number} longitude - The updated longitude of the pin.
 * @param {number} latitude - The updated latitude of the pin.
 * @param {string} [metadata] - Optional metadata to update for the pin.
 * @returns {Promise<Pin>} A promise that resolves to the updated pin object.
 * @throws {Error} Throws an error if the update fails.
 *
 * @example
 * // Update pin with ID 1 with new coordinates and metadata
 * updatePin(1, -73.935242, 40.73061, "Updated favorite spot")
 *   .then(updatedPin => console.log('Updated Pin:', updatedPin))
 *   .catch(error => console.error('Error updating pin:', error));
 */
export const updatePin = async (pin_id: number, longitude: number,
    latitude: number, metadata?: string): Promise<Pin> => {
    const { rows } = await pool.query(
        `UPDATE pins SET longitude = $2 latitude = $3 
        metadata = $4 WHERE pin_id = $1 RETURNING *`,
        [pin_id, longitude, latitude, metadata]
    );
    return rows[0];
}

/**
 * Deletes a pin from the database by its ID.
 *
 * This function removes the specified pin from the `pins` table.
 *
 * @param {number} pin_id - The unique identifier of the pin to delete.
 * @returns {Promise<void>} A promise that resolves when the pin has been successfully deleted.
 * @throws {Error} Throws an error if deleting the pin fails.
 *
 * @example
 * // Delete pin with ID 1
 * deletePin(1)
 *   .then(() => console.log('Pin deleted'))
 *   .catch(error => console.error('Error deleting pin:', error));
 */
export const deletePin = async (pin_id: number): Promise<void> => {
    console.log("Delete pin called");
    await pool.query(
        'DELETE FROM pins WHERE pin_id = $1',
        [pin_id]
    );
}