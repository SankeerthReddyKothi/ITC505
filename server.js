const express = require('express');
const logger = require('morgan');
const path = require('path');

const server = express();

// Middleware
server.use(express.urlencoded({ extended: true }));
server.use(logger('dev'));

// Serve static files
const publicPath = path.join(__dirname, 'public');
server.use(express.static(publicPath));

// POST route handler for form submission
server.post('/submit-form.php', (req, res) => {
    // Retrieve form data from request body
    const { noun, verb, adjective, adverb, place } = req.body;

    // Check if all fields are filled
    if (!noun || !verb || !adjective || !adverb || !place) {
        return res.send(`
            <h1>Submission Failed</h1>
            <p>Please fill out ALL fields</p>
            <a href="/">Go Back to Form</a>
        `);
    }

    // Create the mad lib using the form data
    const madLib = `Once upon a time, a ${adjective} ${noun} decided to ${verb} ${adverb} to ${place}.`;

    // Send the filled-in mad lib back as the response
    res.send(`
        <h1>Mad Lib Generated</h1>
        <p>${madLib}</p>
        <a href="/">Go Back to Form</a>
    `);
});

// GET route handler for the root endpoint
server.get('/', (req, res) => {
    // Serve the HTML file for the form
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Set port to 8080
let port = 80;
if (process.argv[2] === 'local') {
  port = 8080;
}
server.listen(port, () => console.log('Ready on localhost!'));
