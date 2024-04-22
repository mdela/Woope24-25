import express from 'express';
import { authenticateToken } from '../middleware/authMiddleware';
const router = require('express').Router();
import {createResource, deleteResource, modifyResource, searchResources, categorizeResources} from "../models/resources";

router.get('/', (req: express.Request, res: express.Response) => {
  res.send('OK');
});

router.get('/protected-route', authenticateToken, (req: express.Request, res: express.Response) => {
  res.send('Protected!');
});

//create resource
router.post('/create', async (req: express.Request, res: express.Response) => {
    const { user_id, title, description, link, category, endTime } = req.body;

    if (!user_id || !title || !description || !link || !category || !endTime) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        await createResource(user_id, title, description, link, category, new Date(endTime));
        res.status(201).json({ message: "Resource created successfully!" });
    } catch (error) {
        res.status(500).json({ error: `Error creating resource: ${(error as Error).message}` });
    }
});

// delete resource
router.delete('/:resource_id/:user_id', async (req: express.Request, res: express.Response) => {
    const resourceId = parseInt(req.params.resource_id);
    const userId = parseInt(req.params.user_id);

    if (!resourceId || !userId) {
        return res.status(400).json({ error: 'Resource ID and User ID are required' });
    }

    try {
        const isDeleted = await deleteResource(resourceId, userId);
        if (isDeleted) {
            res.status(200).json({ message: 'Resource deleted successfully' });
        } else {
            res.status(404).json({ error: 'Resource not found or not authorized to delete' });
        }
    } catch (error) {
        res.status(500).json({ error: `Error deleting resource: ${(error as Error).message}` });
    }
});

// modify resource
router.put('/:resourceId', async (req: express.Request, res: express.Response) => {
    const resourceId = parseInt(req.params.resourceId);
    const userId = parseInt(req.body.user_id);
    const { title, description, link, category, endTime } = req.body;

    if (!resourceId || !userId || !title || !description || !link || !category || !endTime) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        await modifyResource(resourceId, userId, title, description, link, category, new Date(endTime));
        res.status(200).json({ message: 'Resource modified successfully' });
    } catch (error) {
        res.status(500).json({ error: `Error modifying resource: ${(error as Error).message}` });
    }
});

// searching resources
router.get('/search', async (req: express.Request, res: express.Response) => {
    const { query } = req.query;

    if (!query) {
        return res.status(400).json({ error: 'Search query is required' });
    }

    try {
        const searchResults = await searchResources(query.toString());
        res.json(searchResults);
    } catch (error) {
        res.status(500).json({ error: `Error searching resources: ${(error as Error).message}` });
    }
});

// categorizing resources
router.get('/category/:category', async (req: express.Request, res: express.Response) => {
    const { category } = req.params;

    if (!category) {
        return res.status(400).json({ error: 'Category parameter is required' });
    }

    try {
        const categorizedResources = await categorizeResources(category);
        res.json(categorizedResources);
    } catch (error) {
        res.status(500).json({ error: `Error categorizing resources: ${(error as Error).message}` });
    }
});



module.exports = router;