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
    serviceClient: "114626616500915211540",
    privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQC7rcwJ+UzwtJQ0\n5wlM36G/ahs/NraUCJQB/kh9Beenh5m6/U3Yr7xn67nJWO7g/UGIjmpxcPsU47zX\nbkuA8U1KWp1Kl6cz2b0nTjRThwlZ6eONCKi0uw8p7zekd/aJEYZxqxMp4ZiMSOla\nZctgwoyDydg4xpSBU1XgI2meMlYjQOKfCDgtZyilHZRiSe46aoUcZ9jRnSWvNcQM\nIXGYKhzL3hFnZ3w5l9QX/zixVberiqbz6OpDqJ/0mNXDKKFIXMGOBHfZH3njkfNS\ntSQOzxugBTpxVwi4IH7+lCskkq2ytkf5a9ZLhSnjhRS4uoiVbhLOs/CiCffz3l+U\nGyOzLeCBAgMBAAECggEABjqmjnhwev8AWgjmym8T+hOgTcLf8JYADRiisOkbsygV\nVHMstLXg/MlCcmYN8ChhtuHEs0kQ4VStd3BDB+eiZUbQiImz6Ez4WewO4SyWxS3l\n0kAUwuJgRofYvsAHTg13ixFmtn21C6duHNSq+VY9thBSiZBgPJJes9yzCEfTC3KQ\n148o5CygCBDe7+oeuZWk5hul0JDa64xj0XRlU3aNa3KANf1z8Gh1FW/KL1LGU7Mm\nMrJ15opyr4AYs5YpfzeCpsQjVW+fPMRcCHmjBUksYTgc9P508tiYFB0nScYyl1vm\n+eU4FOx23x8JE/vBbcE9od24GKm9LQLXKuUsFnICUQKBgQDsUBr+CE+HGYUmnBfK\nWT7OIXISUHin3j6pZDfrlpghpEihWtnFSDX3pBbjvOMtyTgNqLGyNuAYQZwYQOJF\nzlF1PvCAW+dAMnHOlAh5Zfy7IZIJWLFf7I65bSge1gA7fR9AfsS9qT1Q6jjTzwuM\nb8eM6il1UZ0VkKz0NavqdlC0kQKBgQDLUHa7mjrNxGwYgL58JzZaYRpfJ2uBQ0Ia\njJUsE8/bL9TawlKgmvcSfiWXJm09Ulwk0AEEoi4yIRGXihK9cHdW1tCx0JCVYuEK\nYSJfcwWCRsw0TFD1QFfiTegEhLYqnfuOhiBuVTtUiC2nC1kYdxolSQee/uoNjtjd\nhgMgXJek8QKBgEkYvkC18WOo0TcQMYu172dzkQV5PtkuNdPP3DxTaNt/JbhDkfkk\nTQ09BJeNZfhTtbMD63Nk5gyavt4Bs/xDxY6u2VXbF70T3YA46iYjFfoMeE/Lz5IM\nalmRGkfvikLcgT5B+DlykDTnPozGDpxyNxevlwNjK2PwTI99yp/L2UsBAoGAfh7F\n6I492BL2syR6BW4Vq278+vXrHF5qjSmUB6mqkN9U/Pb6ZqJ6jcAu9Vpi/V0vx644\nU3V/jp0w2n5OLbGsdfP/ta4ZYnHaA6RJvEgPrMbaOb71oY1udvW47cSddEZYHAtb\n5tV8Xm2zVCIX/LM1RtfMoHalHg/0u0Y8fkCx2SECgYAj2pWFFNO8aMe5ePdt0zup\n/gb4Bv2p9A7fhTNjzECM5XblQMjyT4KceA4H7+07SRSj05iMtYiGN8bVY+uG6v5i\nt1HNtbZCBKLLtMyffwO6R44uLmZ6uSf/YR+847cxb1kbixt2GoSGIgd8NTwQKGww\ndZkYEvSSRy6gbR+gSsSJeA==\n-----END PRIVATE KEY-----\n",
  },
});


const sendMail: SendMail = async (email, subject, html, text, attachments) => {
  try {
    await transporter.verify();
    await transporter.sendMail({
      from: {
        name: "College Of Engineering",
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
