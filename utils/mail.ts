/* eslint-disable no-console */
import nodemailer from 'nodemailer';
import { EMAIL, EMAIL_CLIENT_ID, EMAIL_SECRET, EMAIL_REFRESH_TOKEN } from '../config';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    type: 'OAuth2',
    user: EMAIL,
    clientId: EMAIL_CLIENT_ID,
    clientSecret: EMAIL_SECRET,
    refreshToken: EMAIL_REFRESH_TOKEN,
  },
});

const sendMail: SendMail = async (email, subject, html, text, attachments) => {
  try {
    await transporter.verify();
    await transporter.sendMail({
      from: {
        name: "COE Voting <hello@damiisdandy.com>",
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
