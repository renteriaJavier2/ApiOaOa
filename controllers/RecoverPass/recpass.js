'use strict';

const async = require('async');
const nodeMailer = require('nodemailer');

async function recoverPassword(req, res) {
   try {
      var email = req.body.email;
      let transporter = nodemailer.createTransport({
         host: 'smtp.ethereal.email',
         port: 587,
         secure: false,
         auth: {
            user: 'francisco@getxplor.com',
            pass: 'Ab123456!'
         }
      });
      //cambiar el HTML por texto de recuperacion de pass
      mailOptions = {
         to: email,
         subject: "Please confirm your Email account",
         html: "Hello,<br> Please Click on the link to verify your email.<br><a href=" + link + ">Click here to verify</a>"
      }

      transporter.sendMail(mailOptions, (error, response) => {
         if (error) {
            console.log(JSON.stringify(error))
         } else {
            console.log(JSON.stringify(response))
         }
      });

   } catch (error) {
      console.log(JSON.stringify(error));
   }
}


module.exports = {
   recoverPassword,
}