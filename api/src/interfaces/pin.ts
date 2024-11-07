/**
 * Represents a geographical pin associated with a post.
 * 
 * @interface Pin
 * @property {number} post_id - Identifier of the post associated with the pin.
 * @property {number} user_id - Identifier of the user who created the pin.
 * @property {number} longitude - Longitude coordinate of the pin.
 * @property {number} latitude - Latitude coordinate of the pin.
 * @property {string} metadata - Additional metadata related to the pin (e.g., description or tags).
 * @property {Date} created_at - Date when the pin was created.
 * @property {boolean} is_active - Indicates if the pin is currently active.
 */
export interface Pin {
    post_id: number,
    user_id: number,
    longitude: number,
    latitude: number,
    metadata: string,
    created_at: Date,
    is_active: boolean,
}