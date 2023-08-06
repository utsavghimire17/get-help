const fs = require("fs");
const bcrypt = require("bcrypt");

async function auth(req, res, next) {

        const user = req.userData.find(user => user.email === req.body.email);

        if (user == null) return res.status(400).send("Cannot find the user")

        try {
            if (await bcrypt.compare(req.body.password, user.password)) {
                next();
            }
            else {
                res.sendStaus(403);
            }
        } catch (err) {
            console.log(err);
        }
}

module.exports = auth;

