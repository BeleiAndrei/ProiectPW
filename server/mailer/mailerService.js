
//Nushc3sapun

var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'testingprogram28@gmail.com',
    pass: 'Nushc3sapun'
  }
});

const sendEmail = async (to, text) =>  {
    var mailOptions = {
        from: 'testingprogram28@gmail.com',
        to: to,
        subject: 'Sending Email using Node.js',
        text: text
      };


      console.log("to");
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}
module.exports = {
    sendEmail
};