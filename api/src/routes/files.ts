import express from "express";
import path from "node:path";
import * as fs from "node:fs";
import fileUpload, {UploadedFile} from "express-fileupload";

const router = require('express').Router();
const uploadDirectory = './static/public/uploads';
fs.mkdirSync(uploadDirectory, { recursive: true });
router.use(fileUpload());

router.post('/upload', (req: express.Request, res: express.Response) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        console.log(req.files);
        return res.status(400).send('No files were uploaded.');
    }

    const image = req.files.image as UploadedFile;

    if (!image.mimetype.startsWith('image/')) {
        return res.status(400).send('Only image files are allowed!');
    }

    const imagePath = path.join(uploadDirectory, image.name);

    image.mv(imagePath, (err) => {
        if (err) return res.status(500).send(err);

        res.send('Image uploaded successfully!');
    });

});

module.exports = router;
