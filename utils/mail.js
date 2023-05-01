import nodemailer from 'nodemailer'

export const sendEmail = (subject, message, send_to) =>{

    let config = {
        service : 'gmail',
        auth : {
            user : process.env.EMAIL,
            pass : process.env.PASSWORD
        }
    }

    const transporter = nodemailer.createTransport(config)

    let massage = {
        from : process.env.EMAIL,
        to : send_to,
        subject : subject,
        html : message
    }

    transporter.sendMail(massage, function (err, info) {
        if (err) {
          console.log(err);
        } else {
          console.log(info);
        }
      });
};