const pool = require('../db');

/**
 * Creates a new comment on a specified post.
 *
 * This function inserts a comment into the `comments` table, associates it with a user and post, 
 * and retrieves the username of the comment's author.
 *
 * @param {string} content - The content of the comment.
 * @param {number} user_id - The ID of the user creating the comment.
 * @param {number} post_id - The ID of the post to which the comment belongs.
 * @returns {Promise<Comment>} A promise that resolves to the created comment with username.
 * @throws {Error} Throws an error if the comment creation fails.
 *
 * @example
 * createComment("Great post!", 1, 123)
 *   .then(comment => console.log('New Comment:', comment))
 *   .catch(error => console.error('Error creating comment:', error));
 */
export const createComment = async (content: string, user_id: number, post_id: number): Promise<Comment> => {
    const insertQuery = `
        INSERT INTO comments (content, user_id, post_id, parent_comment_id)
        VALUES ($1, $2, $3, $4)
        RETURNING *
    `;
    const commentResult = await pool.query(insertQuery, [content, user_id, post_id, null]);
    const newComment = commentResult.rows[0];

    const userQuery = `
        SELECT first_name || ' ' || last_name AS username
        FROM profile_information
        WHERE user_id = $1
    `;
    const userResult = await pool.query(userQuery, [newComment.user_id]);
    const username = userResult.rows[0]?.username;

    return {
        ...newComment,
        username: username 
    };
};

/**
 * Retrieves all active comments for a specific post.
 *
 * This function queries the `comments` table for all active comments on a post, 
 * along with the usernames of the commenters.
 *
 * @param {number} post_id - The ID of the post whose comments are being retrieved.
 * @returns {Promise<Comment[]>} A promise that resolves to an array of comments.
 * @throws {Error} Throws an error if retrieving comments fails.
 *
 * @example
 * getComments(123)
 *   .then(comments => console.log('Comments:', comments))
 *   .catch(error => console.error('Error getting comments:', error));
 */
export const getComments = async (post_id: number): Promise<Comment[]> => {
    const { rows } = await pool.query(
        `SELECT comments.*, pi.first_name || ' ' || pi.last_name AS username
         FROM comments
         JOIN users u ON u.user_id = comments.user_id
         JOIN profile_information pi ON pi.user_id = u.user_id
         WHERE comments.post_id = $1 AND comments.is_active = true
         ORDER BY comments.created_at DESC`,
        [post_id]
    );
    return rows;
};

/**
 * Updates the content of a specified comment.
 *
 * This function updates the content of a comment identified by `comment_id`.
 *
 * @param {number} comment_id - The unique identifier of the comment to update.
 * @param {string} content - The new content of the comment.
 * @returns {Promise<Comment>} A promise that resolves to the updated comment.
 * @throws {Error} Throws an error if the update fails.
 *
 * @example
 * updateComment(1, "Updated content")
 *   .then(updatedComment => console.log('Updated Comment:', updatedComment))
 *   .catch(error => console.error('Error updating comment:', error));
 */
export const updateComment = async (comment_id: number, content: string): Promise<Comment> => {
    const { rows } = await pool.query(
        'UPDATE comments SET content = $1 WHERE comment_id = $2 RETURNING *',
        [content, comment_id]
    );
    return rows[0];
}

/**
 * Deletes a comment by its ID.
 *
 * This function removes a comment from the `comments` table in a transactional way.
 *
 * @param {number} comment_id - The unique identifier of the comment to delete.
 * @returns {Promise<void>} A promise that resolves when the comment has been successfully deleted.
 * @throws {Error} Throws an error if deleting the comment fails.
 *
 * @example
 * deleteComment(1)
 *   .then(() => console.log('Comment deleted'))
 *   .catch(error => console.error('Error deleting comment:', error));
 */
export const deleteComment = async (comment_id: number): Promise<void> => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        await client.query('DELETE FROM comments WHERE comment_id = $1', [comment_id]);
        await client.query('COMMIT');
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
}

/**
 * Adds a like to a comment.
 *
 * This function increments the `likes_count` for the specified comment in the `comments` table.
 *
 * @param {number} comment_id - The unique identifier of the comment to like.
 * @returns {Promise<Comment>} A promise that resolves to the updated comment.
 * @throws {Error} Throws an error if adding the like fails.
 *
 * @example
 * addCommentLike(1)
 *   .then(updatedComment => console.log('Liked Comment:', updatedComment))
 *   .catch(error => console.error('Error adding like:', error));
 */
export const addCommentLike = async (comment_id: number): Promise<Comment> => {
    const { rows } = await pool.query(
        'UPDATE comments SET likes_count = likes_count + 1 WHERE comment_id = $1 RETURNING *',
        [comment_id]
    );
    return rows[0];
}

/**
 * Removes a like from a comment.
 *
 * This function decrements the `likes_count` for the specified comment in the `comments` table.
 *
 * @param {number} comment_id - The unique identifier of the comment to unlike.
 * @returns {Promise<Comment>} A promise that resolves to the updated comment.
 * @throws {Error} Throws an error if removing the like fails.
 *
 * @example
 * removeCommentLike(1)
 *   .then(updatedComment => console.log('Unliked Comment:', updatedComment))
 *   .catch(error => console.error('Error removing like:', error));
 */
export const removeCommentLike  = async (comment_id: number): Promise<Comment> => {
    const { rows } = await pool.query(
        'UPDATE comments SET likes_count = likes_count - 1 WHERE comment_id = $1 RETURNING *',
        [comment_id]
    );
    return rows[0];
}