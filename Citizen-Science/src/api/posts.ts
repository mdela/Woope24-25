import { fetchAPI } from "./fetch";

export const createPost = async (user_id: number, content: string) => {
    console.log(user_id, content);
    return fetchAPI('/forum/posts', 'POST', { user_id, content });
}

export const getAllPosts = async (id: number) => {
    return fetchAPI(`/forum/posts/${id}`, 'GET');
}

export const getPostById = async (id: number) => {
    return fetchAPI(`/forum/posts/${id}`, 'GET');
}

export const getPostByUserId = async (userId: number) => {
    return fetchAPI(`/forum/posts/user/${userId}`, 'GET');
}

export const deletePost = async (id: number) => {
    return fetchAPI(`/posts/${id}`, 'DELETE');
}

export const updatePost = async (id: number, content: string) => {
    return fetchAPI(`/forum/posts/${id}`, 'PUT', { content });
}

export const likePost = async (id: number, user_id: number) => {
    return fetchAPI(`/forum/posts/${id}/like`, 'POST', {user_id});
}

export const unlikePost = async (id: number, user_id: number) => {
    return fetchAPI(`/forum/posts/${id}/like`, 'DELETE', {user_id});
}

export const getPostLikes = async (id: number) => {
    return fetchAPI(`/forum/posts/${id}/likes`, 'GET');
}

export const getUserLikedPosts = async (id: number) => {
    return fetchAPI(`/forum/posts/user/${id}/likes`, 'GET');
}