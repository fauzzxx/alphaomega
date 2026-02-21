const express = require('express');
const app = express();

// Simple route
app.get('/', (req, res) => {
    res.send("Welcome to Express.js");
});

// Route parameter example
app.get('/user/:id', (req, res) => {
    const userId = req.params.id;
    res.send("User ID is: " + userId);
});

// Multiple route parameters
app.get('/product/:category/:id', (req, res) => {
    const category = req.params.category;
    const id = req.params.id;

    res.send(`Category: ${category}, Product ID: ${id}`);
});

// Query parameter example
app.get('/search', (req, res) => {
    const name = req.query.name;
    const age = req.query.age;

    res.send(`Search Name: ${name}, Age: ${age}`);
});

// Start server
app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});
