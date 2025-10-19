import nodemailer from "nodemailer";
import { generatePDF } from "@/actions/pdf.actionts";

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

export async function sendMailWithPDF({
  to,
  subject,
  text,
  html,
  pdfContent,
  filename,
}: {
  to: string;
  subject: string;
  text: string;
  html?: string;
  pdfContent: string;
  filename: string;
}) {
  try {
    const pdfBuffer = await generatePDF({ source: pdfContent });

    const info = await transporter.sendMail({
      from: '"Kindle Lyrics 💿" <brandon7.7porcel@gmail.com>',
      to,
      subject,
      text: text || "",
      html: html ?? "",
      attachments: [
        {
          filename: filename || "keep-lyrics.pdf",
          content: pdfBuffer as any,
        },
      ],
    });

    return info;
  } catch (error: any) {
    console.error("Error sending mail with PDF:", error.message);
    throw new Error("Failed to send mail");
  }
}
