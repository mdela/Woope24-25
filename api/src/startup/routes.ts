import express from 'express';
let healthRouter = require('../routes/health');
let authRouter = require('../routes/authentication');
let filesRouter = require('../routes/files');
// add more routers here

module.exports = function (app: express.Application) {
    app.use(express.json());
    app.use('/auth', authRouter);
    app.use('/health', healthRouter);
    app.use('/files', filesRouter);
};