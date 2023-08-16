import * as nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";

export const sendEmail = async (
  email: string,
  subject: string,
  text: string
) => {
  try {
    const transporter = nodemailer.createTransport({
      service: process.env.SERVICE,
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });

    const mailOptions: Mail.Options = {
      from: process.env.USER,
      to: email,
      subject,
      text,
    };

    const emailSendResponse = new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          reject(err);
        }

        resolve(info);
      });
    });

    return await emailSendResponse;
  } catch (err: any) {
    return err;
  }
};
