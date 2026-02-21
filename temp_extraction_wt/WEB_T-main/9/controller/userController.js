const user = require('../model/userModel');

exports.getUser = (req, res) => {
    res.send(`
        <h2>User Details</h2>
        <p>Name: ${user.name}</p>
        <p>Role: ${user.role}</p>
    `);
};
