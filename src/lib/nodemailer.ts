import nodemailer from "nodemailer";

const SMTP_SERVER_HOST = process.env.SMTP_SERVER_HOST;
const SMTP_SERVER_USERNAME = process.env.SMTP_SERVER_USERNAME;
const SMTP_SERVER_PASSWORD = process.env.SMTP_SERVER_PASSWORD;

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: SMTP_SERVER_HOST,
  port: 587,
  secure: false,
  auth: {
    user: SMTP_SERVER_USERNAME,
    pass: SMTP_SERVER_PASSWORD,
  },
});

export async function sendMail({
  sendTo,
  subject,
  text,
  html,
}: {
  sendTo: string;
  subject: string;
  text: string;
  html?: string;
}) {
  try {
    const isVerified = await transporter.verify();
    if (!isVerified) {
      throw new Error("SMTP Server Not Verified");
    }
  } catch (error) {
    console.error("Something Went Wrong", error);
    return;
  }

  const info = await transporter.sendMail({
    from: '"Kindle Lyrics 💿" <brandon7.7porcel@gmail.com>',
    to: sendTo,
    subject: subject,
    text: text,
    html: html ?? "",
  });

  return info;
}
