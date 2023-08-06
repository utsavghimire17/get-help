const nodemailer = require("nodemailer");


async function main(details) {
    

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
            subject: "EXTRA DETAILS",
            text: `Name: ${details.name}
            Description: ${details.description}`
        });

    let returnMessage = {to: info.envelope.to[0],
                        from: info.envelope.from,
                        mailUrl: nodemailer.getTestMessageUrl(info)}
    
    return returnMessage;
}

module.exports = main;