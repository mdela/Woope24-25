import {start} from "node:repl";

const pool = require('../db');

import { Resource } from "../interfaces/Resource";

export const createResource = async (user_id: number, title: string, description: string, link: string, category: string, endTime: Date, isActive: boolean = true): Promise<void> => {
    const query = `
        INSERT INTO resources (user_id, title, description, link, category, end_time, is_active)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *;
        `;
    const values = [user_id, title, description, link, category, endTime, isActive];

    try {
        const result = await pool.query(query, values);
        if (result.rowCount === 0) {
         throw new Error("Problem in creating resource!");
        }
    } catch (error) {
        throw new Error((error as Error).message);
    }
};

export const deleteResource = async (resourceId: number, userId: number): Promise<boolean> => {
    const query = 'DELETE FROM resources WHERE resource_id = $1 AND user_id = $2';
    const values = [resourceId, userId];

    try {
        const result = await pool.query(query, values);
        return result.rowCount > 0;
    } catch (error) {
        throw new Error((error as Error).message);
    }
};

export const modifyResource = async (resourceId: number, userId: number, title: string, description: string, link: string, category: string, endTime: Date, isActive: boolean = true): Promise<void> => {
    const query = `
        UPDATE resources
        SET title = $1, description = $2, link = $3, category = $4, end_time = $5, is_active = $6
        WHERE resource_id = $7 AND user_id = $8;
        `;
    const values = [title, description, link, category, endTime, isActive, resourceId, userId];

    try {
        const result = await pool.query(query, values);
        if (result.rowCount === 0) {
         throw new Error("Problem in modifying resource!");
        }
    } catch (error) {
        throw new Error((error as Error).message);
    }
};

export const searchResources = async (query: string): Promise<Resource[]> => {
    const searchQuery = `%${query}%`;
    const sql = `
        SELECT * 
        FROM resources 
        WHERE title ILIKE $1 OR description ILIKE $1;
    `;
    const values = [searchQuery];

    try {
        const { rows } = await pool.query(sql, values);
        return rows;
    } catch (error) {
        throw new Error(`Error searching resources: ${(error as Error).message}`);
    }
};

export const categorizeResources = async (category: string): Promise<Resource[]> => {
    const searchQuery = `%${category}%`; // Assuming the category is a substring of the actual category
    const sql = `
        SELECT * 
        FROM resources 
        WHERE category ILIKE $1;
    `;
    const values = [searchQuery];

    try {
        const { rows } = await pool.query(sql, values);
        return rows;
    } catch (error) {
        throw new Error(`Error searching resources by category: ${(error as Error).message}`);
    }
};



