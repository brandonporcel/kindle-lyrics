"use server";

import { sendMailWithPDF } from "@/lib/nodemailer";

export const sendAlbumEmail = async ({
  email,
  template,
  albumName,
}: {
  email: string;
  albumName: string;
  template: string;
}) => {
  try {
    const response = await sendMailWithPDF({
      to: email,
      subject: "convert",
      text: "",
      html: `<p>${albumName}</p>`,
      pdfContent: template,
      filename: albumName + ".pdf",
    });

    return response;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
