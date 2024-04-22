import express from 'express';
import { authenticateToken } from '../middleware/authMiddleware';
const router = require('express').Router();
import {createResource, deleteResource} from "../models/resources";


/* 

router.get('/', (req: express.Request, res: express.Response) => {
    res.send('OK');
});
//createEvent
router.post('/create', async (req: express.Request, res: express.Response) => {
    const { user_id, title, description, endTime} = req.body;

    if (!user_id || !title || !description || !endTime) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const event = await createResource(user_id, title, description, new Date(endTime));
        res.status(201).json({message: "Resource created successfully!"});
    } catch (error) {
        res.status(500).json({ error: `Error creating resource: ${(error as Error).message}` });
    }
});

*/


