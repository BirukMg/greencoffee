'use strict';
const nodemailer = require('nodemailer');

module.exports = function(Email) {
    /**
     * sending email from users
     * @param {string} from sender email address
     * @param {string} subject email subject
     * @param {string} text email body
     * @param {string} html html body
     * @param {Function(Error, object)} callback
     */

    Email.prototype.sendEmail = async function (from, subject, text, html, callback) {
      var result;
    //   var from, subject, text, html;
      let testAccount = await nodemailer.createTestAccount();
    //   console.log(testAccount)
        Email.find(function (err, emails) {
          from = emails[0].from;
          subject = emails[0].subject;
          text = emails[0].text;
          html = emails[0].html;
        });
        let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'info.greencoffeeai@gmail.com', // generated ethereal user
            pass: 'info2@greencoffee' // generated ethereal password
        }
        });
        let info = await transporter.sendMail({
          to: 'info@greencoffeeai.com', // list of receivers
          subject: subject, // Subject line
          text: text, // plain text body
          html: html // html body
        });

        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
      callback(null, result);
    };
};
