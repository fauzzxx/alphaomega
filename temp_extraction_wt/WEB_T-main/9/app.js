const express = require('express');
const app = express();
const userController = require('./controller/userController');

// Route handled by Controller
app.get('/user', userController.getUser);

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});