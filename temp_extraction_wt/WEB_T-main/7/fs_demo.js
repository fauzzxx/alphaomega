// Import File System module
const fs = require('fs');

// 1. Write data to a file
fs.writeFile('sample.txt', 'Hello, this is Node.js File System!', function(err) {
    if (err) {
        console.log("Error writing file");
    } else {
        console.log("File written successfully");

        // 2. Read data from the file
        fs.readFile('sample.txt', 'utf8', function(err, data) {
            if (err) {
                console.log("Error reading file");
            } else {
                console.log("File content:");
                console.log(data);
            }
        });
    }
});
