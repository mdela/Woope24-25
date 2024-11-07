/** 
 * The Express module imported to create and configure an HTTP server.
 */
const express = require('express');

/** 
 * An instance of the Express application used to define routes, middleware, and server configurations.
 */
const app = express();

/** 
 * The port number on which the server will listen.
 * Uses the `PORT` environment variable if set; otherwise defaults to '3000'.
 */
const port = process.env.PORT || '3000';

require('./startup/routes')(app);
app.listen(port)