

const ejs = require('ejs'); 
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.APP_EMAIL,
    pass: process.env.EMAIL_PASS 
  }
});


const sendOTPemail= function(email, pwd, codeOTP){

  ejs.renderFile(__dirname + '/app_activation.ejs',
    { email: email },{ pwd: pwd },{ codeOTP: codeOTP }, 
    (err, htmlData) => {

    if (err) {
      console.error("Unable to read HTML file: ", err);
      return;
    }
  
    var mailOptions = {
      from: process.env.APP_EMAIL,
      to: email,
      subject: 'Bienvenue dans notre application quicktransfer',
      html: htmlData
    };
  
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  });
  
}


module.exports = sendOTPemail;
