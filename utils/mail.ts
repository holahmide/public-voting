/* eslint-disable no-console */
import nodemailer from 'nodemailer';
import { EMAIL, EMAIL_CLIENT_ID, EMAIL_SECRET } from '../config';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    type: 'OAuth2',
    user: EMAIL,
    serviceClient: EMAIL_CLIENT_ID,
    privateKey: EMAIL_SECRET,
  },
});

const sendMail: SendMail = async (email, subject, html, text, attachments) => {
  // if (process.env.NODE_ENV === 'development') {
  //   console.log(`FROM: ${COMPANY_EMAIL}
  // \nTO: ${typeof email === 'string' ? email : email.join(', ')}
  // \n${subject}
  // \n${html}`);
  //   return {
  //     status: true,
  //     message: 'mail sent successfully',
  //   };
  // }
  try {
    await transporter.verify();
    await transporter.sendMail({
      from: {
        name: 'VOTING SITE 👍',
        address: EMAIL,
      },
      to: email,
      subject,
      html,
      text: text || 'TEXT EMAILS - COMING SOON :(',
      attachments: attachments || [],
    });
    return {
      status: true,
      message: 'mail sent successfully',
    };
  } catch (err) {
    console.log(err);
    return {
      status: false,
      message: err,
    };
  }
};

export default {
  sendMail,
};
