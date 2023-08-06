const nodemailer = require("nodemailer");


async function main(locationData) {
    const {latitude, longitude, state, postalCode, city} = locationData;

    // console.log(locationData);
    let ALERT_MSG = `To Whom It May Concern,

    I am in an emergency situation at ${city}, ${state} ${postalCode} at (Latitude, Longitude) : (${latitude}, ${longitude}) and require immediate assistance from the police department. 

    Please send help urgently as I fear for my safety.

    Sincerely, 
    Email Test 0`

    let testAcc = await nodemailer.createTestAccount();

    let transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false,
            auth: {
                user: testAcc.user,
                pass: testAcc.pass,
            }
        });
    
    let info = await transporter.sendMail({
            to: "emailtestnodejs0@gmail.com",
            from: "navneetkaini@gmail.com",
            subject: "SOS - EMERGENCY",
            text: ALERT_MSG
        });

    let returnMessage = {to: info.envelope.to[0],
                        from: info.envelope.from,
                        mailUrl: nodemailer.getTestMessageUrl(info)}
    
    return returnMessage;
}

module.exports = main;