/**
 * Represents a PDF file with URI and name properties.
 * 
 * @typedef {Object} PdfFile
 * @property {string} uri - The URI location of the PDF file.
 * @property {string} name - The name of the PDF file.
 */
export type PdfFile = {
	uri: string;
	name: string;
};

/**
 * Represents a post created by a user.
 * 
 * @interface Post
 * @property {number} post_id - Unique identifier for the post.
 * @property {number} user_id - Unique identifier of the user who created the post.
 * @property {string} content - Content of the post.
 * @property {Date} created_at - Date when the post was created.
 * @property {boolean} is_updated - Indicates if the post has been updated.
 * @property {number} comments_count - Number of comments on the post.
 * @property {number} likes_count - Number of likes on the post.
 * @property {boolean} is_active - Indicates if the post is active.
 */
export interface Post{
    post_id: number,
    user_id: number,
    content: string,
    created_at: Date,
    is_updated: boolean,
    comments_count: number, 
    likes_count: number,
    is_active: boolean,
}


/**
 * Extends `Post` to include the username of the post creator.
 * 
 * @interface PostWithUsername
 * @extends Post
 * @property {string} username - The username of the post's creator.
 */
export interface PostWithUsername{
    post_id: number,
    user_id: number,
    username: string,
    content: string,
    created_at: Date,
    is_updated: boolean,
    comments_count: number,
    likes_count: number,
    is_active: boolean,
}

/**
 * Extends `PostWithUsername` to include media associated with the post.
 * 
 * @interface PostWithMedia
 * @extends PostWithUsername
 * @property {PostMedia[]} media - Array of media objects attached to the post.
 */
export interface PostWithMedia {
    post_id: number;
    user_id: number;
    username: string;
    content: string;
    created_at: Date;
    is_updated: boolean;
    comments_count: number;
    likes_count: number;
    is_active: boolean;
    media: PostMedia[];
}

/**
 * Represents a post liked by the user, including media, comments, and like status.
 * 
 * @interface UserLikedPosts
 * @property {number} post_id - Unique identifier for the post.
 * @property {string[]} image - Array of image URLs related to the post.
 * @property {string} content - Content of the post.
 * @property {PdfFile[]} pdfs - Array of PDF files attached to the post.
 * @property {Comment[]} comments - Array of comments on the post.
 * @property {number} timestamp - Timestamp of when the post was created.
 * @property {string} username - The username of the post creator.
 * @property {number} likes_count - Number of likes on the post.
 * @property {boolean} likedPost - Indicates if the current user has liked the post.
 */
export interface UserLikedPosts{
    post_id: number;
	image: string[];
	content: string;
	pdfs: PdfFile[];
	comments: Comment[];
	timestamp: number;
	username: string;
	likes_count: number;
	likedPost: boolean;
}

/**
 * Represents a comment on a post.
 * 
 * @interface Comment
 * @property {number} comment_id - Unique identifier for the comment.
 * @property {number} post_id - Identifier of the post the comment belongs to.
 * @property {number | null} parent_comment_id - Identifier of the parent comment if the comment is a reply; null if it's not a reply.
 * @property {number} user_id - Identifier of the user who created the comment.
 * @property {string} content - Content of the comment.
 * @property {Date} created_at - Date the comment was created.
 * @property {boolean} is_active - Indicates if the comment is active.
 * @property {Date | null} deleted_at - Date the comment was deleted; null if it hasn't been deleted.
 * @property {number} likes_count - Number of likes on the comment.
 */
export interface Comment {
    comment_id: number;
    post_id: number;
    parent_comment_id: number | null;
    user_id: number;
    content: string;
    created_at: Date;
    is_active: boolean;
    deleted_at: Date | null;
    likes_count: number;
}

/**
 * Represents media attached to a post.
 * 
 * @interface PostMedia
 * @property {number} media_id - Unique identifier for the media.
 * @property {number} post_id - Identifier of the post the media belongs to.
 * @property {'PDF' | 'Image'} media_type - Type of media, either PDF or Image.
 * @property {string} media_url - URL of the media.
 * @property {Date} created_at - Date the media was added.
 * @property {Date} updated_at - Date the media was last updated.
 */
export interface PostMedia {
    media_id: number;
    post_id: number;
    media_type: 'PDF' | 'Image';
    media_url: string;
    created_at: Date;
    updated_at: Date;
}

/**
 * Represents a like on a post.
 * 
 * @interface PostLike
 * @property {number} like_id - Unique identifier for the like.
 * @property {number} post_id - Identifier of the post that was liked.
 * @property {number} user_id - Identifier of the user who liked the post.
 * @property {Date} created_at - Date the like was created.
 */
export interface PostLike {
    like_id: number;
    post_id: number;
    user_id: number;
    created_at: Date;
}

/**
 * Represents a like on a comment.
 * 
 * @interface CommentLike
 * @property {number} like_id - Unique identifier for the like.
 * @property {number} comment_id - Identifier of the comment that was liked.
 * @property {number} user_id - Identifier of the user who liked the comment.
 * @property {Date} created_at - Date the like was created.
 */
export interface CommentLike {
    like_id: number;
    comment_id: number;
    user_id: number;
    created_at: Date;
}