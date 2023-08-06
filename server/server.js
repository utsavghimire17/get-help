const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const auth = require("./middlewares/auth");
const loadUsers = require("./middlewares/loadUsers");
const bcrypt = require("bcrypt");
const fs = require("fs");

const mainLoction = require("./controllers/locationEmailController");
const mainDetails = require("./controllers/detailsHandler");
require("dotenv").config(); // loading the environment contents into process.env

const app = express();

app.use(cors());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
app.use(express.json())

app.post('/alert', async (req, res) => {
    console.log(req.body);
    let locationData = req.body;
    let returnMessage = await mainLoction(locationData).catch(console.error);
    
    res.json(
        {
            status: 200,
            body: JSON.stringify(returnMessage),
        }
    );
})

app.post('/details', async (req, res) => {
    let details = req.body
    let returnMessage = await mainDetails(details).catch(console.error);
    console.log(returnMessage);
})

app.post("/signup", loadUsers, async (req, res) => {

    const newUser = req.body;
    if (req.userData.filter(user => user.email === newUser.email).length > 0) return res.json(
            {status: 400,
            data: "Choose a different email"}
        );

    try {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(newUser.password, salt);

        newUser.password = hashedPassword;
        req.userData.push(newUser);
        console.log(req.userData);
        fs.writeFileSync("./data/users.json", JSON.stringify(req.userData));
        res.json({
            status:200,
            data: {name: req.body.name,
                   email: req.body.email}
        })
    } catch (err) {
        res.json({
            status: 500
        });
    }
})

app.post("/login", loadUsers, auth,(req, res) => {
    res.json({
        status: 200,
        data: {name: req.body.name,
            email: req.body.email}
    })
})

app.listen(9002);

