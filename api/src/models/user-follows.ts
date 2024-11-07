const pool = require('../db');

/**
 * Creates a follow relationship between two users in the database.
 *
 * This function takes the follower's ID and the ID of the user to be followed, 
 * and inserts a new record into the `user_follows` table. If any error occurs, 
 * it rolls back the transaction to ensure database integrity.
 *
 * @param {string} follower_id - The ID of the user who is following.
 * @param {string} following_id - The ID of the user who is being followed.
 * @returns {Promise<{ follower_id: string; following_id: string }>} 
 * An object containing the IDs of the follower and the followed user if the operation is successful.
 * @throws {Error} Throws an error with a descriptive message if the follow creation fails.
 *
 * @example
 * // Create a follow relationship where user with ID 'user1' follows user with ID 'user2'
 * createFollowRelation('user1', 'user2')
 *   .then(result => console.log(result))
 *   .catch(error => console.error(error.message));
 */
export const createFollowRelation = async (follower_id: string, following_id: string) => {
	try {
		await pool.query('BEGIN');



		const query = 'INSERT INTO user_follows (follower_id, following_id) VALUES ($1, $2)';
		const values = [follower_id, following_id];

		await pool.query(query, values);

		await pool.query('COMMIT');

		return {
			follower_id: follower_id,
			following_id: following_id,
		};

	} catch (error) {
		await pool.query('ROLLBACK');
		throw new Error("Error generating follow: " + (error as Error).message);
	}
};

/**
 * Deletes a follow relationship between two users in the database.
 *
 * This function removes a record from the `user_follows` table, ending the follow
 * relationship between the specified follower and the followed user. If any error 
 * occurs, it rolls back the transaction to maintain database integrity.
 *
 * @param {string} follower_id - The ID of the user who is unfollowing.
 * @param {string} following_id - The ID of the user who is being unfollowed.
 * @returns {Promise<{ follower_id: string; following_id: string }>} 
 * An object containing the IDs of the follower and the user they unfollowed if the operation is successful.
 * @throws {Error} Throws an error with a descriptive message if the follow deletion fails.
 *
 * @example
 * // Delete a follow relationship where user with ID 'user1' unfollows user with ID 'user2'
 * deleteFollowRelation('user1', 'user2')
 *   .then(result => console.log(result))
 *   .catch(error => console.error(error.message));
 */
export const deleteFollowRelation = async (follower_id: string, following_id: string) => {
	try {
		await pool.query('BEGIN');

		const query = 'DELETE FROM user_follows WHERE follower_id = $1 AND following_id = $2;';
		const values = [follower_id, following_id];

		await pool.query(query, values);

		await pool.query('COMMIT');

		return {
			follower_id: follower_id,
			following_id: following_id,
		};

	} catch (error) {
		await pool.query('ROLLBACK');
		throw new Error("Error removing follow: " + (error as Error).message);
	}
};

/**
 * Retrieves a list of users that a specified user is following.
 *
 * This function fetches the `user_id`, `first_name`, and `last_name` of all users
 * that the specified user is following by joining the `user_follows` table with the
 * `profile_information` table. If the user is not following anyone, it returns `null`.
 *
 * @param {string} user_id - The ID of the user whose following list is being retrieved.
 * @returns {Promise<Array<{ user_id: string; first_name: string; last_name: string }> | null>} 
 * An array of objects containing `user_id`, `first_name`, and `last_name` of each followed user, or `null` if none are found.
 * @throws {Error} Throws an error with a descriptive message if the retrieval fails.
 *
 * @example
 * // Get the following list for a user with ID 'user1'
 * getFollowingList('user1')
 *   .then(result => console.log(result))
 *   .catch(error => console.error(error.message));
 */
export const getFollowingList = async (user_id: string) => {
	try {
		await pool.query('BEGIN');

        {/* Returns user_id first and last name of all people that the user follows */}
		const query = 'SELECT pi.user_id, pi.first_name, pi.last_name FROM user_follows uf INNER JOIN profile_information pi ON uf.following_id = pi.user_id WHERE uf.follower_id = $1;';
		const values = [user_id];

		const result = await pool.query(query, values);

        if (result.rows.length === 0) {
			return null;
		}
		return result.rows;

	} catch (error) {
		throw new Error("Internal Server Error: " + (error as Error).message);
	}
};

/**
 * Retrieves the count of followers for a specified user.
 *
 * This function returns the total number of users following the specified user by
 * querying the `user_follows` table. The result is an object containing the follower count.
 *
 * @param {string} user_id - The ID of the user whose follower count is being retrieved.
 * @returns {Promise<{ follower_of_count: number }>} 
 * An object with the `follower_of_count` property, indicating the number of followers.
 * @throws {Error} Throws an error with a descriptive message if the count retrieval fails.
 *
 * @example
 * // Get the follower count for a user with ID 'user1'
 * getFollowerCount('user1')
 *   .then(result => console.log(result.follower_of_count))
 *   .catch(error => console.error(error.message));
 */
export const getFollowerCount = async (user_id: string) => {
	try {
		await pool.query('BEGIN');

        {/* Returns count of all people that follow the user */}
		const query = 'SELECT COUNT(following_id) AS follower_of_count FROM user_follows WHERE following_id = $1;';
		const values = [user_id];
		
		const result = await pool.query(query, values);

		return result.rows[0];

	} catch (error) {
		throw new Error("Internal Server Error: " + (error as Error).message);
	}
};

/**
 * Retrieves the count of users that a specified user is following.
 *
 * This function returns the total number of users that the specified user is following
 * by querying the `user_follows` table. The result is an object containing the following count.
 *
 * @param {string} user_id - The ID of the user whose following count is being retrieved.
 * @returns {Promise<{ following_of_count: number }>} 
 * An object with the `following_of_count` property, indicating the number of users the specified user is following.
 * @throws {Error} Throws an error with a descriptive message if the count retrieval fails.
 *
 * @example
 * // Get the following count for a user with ID 'user1'
 * getFollowingCount('user1')
 *   .then(result => console.log(result.following_of_count))
 *   .catch(error => console.error(error.message));
 */
export const getFollowingCount = async (user_id: string) => {
	try {
		await pool.query('BEGIN');

        {/* Returns count of all people that user follows*/}
		const query = 'SELECT COUNT(follower_id) AS following_of_count FROM user_follows WHERE follower_id = $1;';
		const values = [user_id];

		const result = await pool.query(query, values);

		return result.rows[0];

	} catch (error) {
		throw new Error("Internal Server Error: " + (error as Error).message);
	}
};

/**
 * Retrieves a list of users that are following a specified user.
 *
 * This function fetches the `user_id`, `first_name`, and `last_name` of all users
 * who follow the specified user by joining the `user_follows` table with the
 * `profile_information` table. If no users are found, it returns `null`.
 *
 * @param {string} user_id - The ID of the user whose followers list is being retrieved.
 * @returns {Promise<Array<{ user_id: string; first_name: string; last_name: string }> | null>} 
 * An array of objects containing `user_id`, `first_name`, and `last_name` of each follower, or `null` if none are found.
 * @throws {Error} Throws an error with a descriptive message if the retrieval fails.
 *
 * @example
 * // Get the list of followers for a user with ID 'user1'
 * getFollowersList('user1')
 *   .then(result => console.log(result))
 *   .catch(error => console.error(error.message));
 */
export const getFollowersList = async (user_id: string) => {
    try{
        await pool.query('BEGIN');

        {/* Returns user_id, first and last name of all people that follow a user */}
		const query = 'SELECT pi.user_id, pi.first_name, pi.last_name FROM user_follows uf INNER JOIN profile_information pi ON uf.follower_id = pi.user_id WHERE uf.following_id = $1;';
		const values = [user_id];

		const result = await pool.query(query, values);

        if (result.rows.length === 0) {
			return null;
		}
		return result.rows;
    } catch (error) {
		throw new Error("Internal Server Error: " + (error as Error).message);
	}
};

/**
 * Checks if a follow relationship exists between two users.
 *
 * This function checks if a specified user (follower) is following another user
 * by querying the `user_follows` table. It returns `1` if the relationship exists and `0` if not.
 *
 * @param {string} follower_id - The ID of the user who is potentially following.
 * @param {string} following_id - The ID of the user who is potentially being followed.
 * @returns {Promise<{ status: number } | 0>} 
 * An object with a `status` property set to `1` if the follow relationship exists, or `0` if not.
 * @throws {Error} Throws an error with a descriptive message if the check fails.
 *
 * @example
 * // Check if 'user1' is following 'user2'
 * checkFollowExists('user1', 'user2')
 *   .then(result => console.log(result.status === 1 ? "Following" : "Not Following"))
 *   .catch(error => console.error(error.message));
 */
export const checkFollowExists = async (follower_id: string, following_id: string) => {
    try{
        await pool.query('BEGIN');

        {/* Returns 1 if the follower follows the specified following*/}
		const query = 'SELECT 1 AS status FROM user_follows uf WHERE uf.follower_id = $1 AND uf.following_id = $2';
		const values = [follower_id, following_id];

		const result = await pool.query(query, values);

        if (result.rows.length === 0) {
			return 0;
		}
		return result.rows[0];
    } catch (error) {
        throw new Error("Internal Server Error: " + (error as Error).message);
    }
};

module.exports = { createFollowRelation, deleteFollowRelation, getFollowingList, getFollowersList, getFollowingCount, getFollowerCount, checkFollowExists };