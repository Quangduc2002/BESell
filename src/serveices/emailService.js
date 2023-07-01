require('dotenv').config();
const nodemailer = require("nodemailer");


let sendSimpleEmail = async (receiverEmail) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.forwardemail.net",
        port: 465,
        secure: true,
        auth: {
          // TODO: replace `user` and `pass` values from <https://forwardemail.net>
          user: process.env.EMAIL_APP,
          pass: process.env.EMAIL_APP_PASSWORD
        }
      });

    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: '"Quang Đức 👻" <phamquangduc110@gmail.com>', // sender address
        to: receiverEmail, // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
    });
}


module.exports={sendSimpleEmail: sendSimpleEmail}