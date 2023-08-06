const fs = require("fs");

function loadUsers(req, res, next) {
    
    try {
        let userData = fs.readFileSync("./data/users.json");
        userData = JSON.parse(userData);
        req.userData = userData;
        next();

    } catch (err) {
        console.log(err);
    }
}

module.exports = loadUsers;