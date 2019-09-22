'use strict';

const async = require('async');
const models = require('../../models');
const nodeMailer = require('nodemailer');

exports.verifyRegister = async (email, id) => {
   try {
      var rand = Math.floor((Math.random() * 100) + 54);
      var host = req.hostname;
      var link = "http://" + host + "/verify?id=" + rand;
      await saveHashVerify(id, rand);
      let transporter = nodemailer.createTransport({
         host: 'smtp.ethereal.email',
         port: 587,
         secure: false,
         auth: {
            user: 'francisco@getxplor.com',
            pass: 'Ab123456!'
         }
      });

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

async function saveHashVerify(id, hash) {
   try {
      await models.Hashes.create({
         random_hash: hash,
         idUser: id
      })
   } catch (error) {
      console.log(JSON.stringify(error));
   }
}

module.exports = {
   verifyRegister,
}