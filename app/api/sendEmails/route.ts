import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  const { smtpData, recipientEmail, mailData } = await req.json();
  try {
    const paragraph = mailData.text.split(".");
    const trimmedParagraph = paragraph.filter(
      (para: any) => para.trim() !== ""
    );
    const individualPara = trimmedParagraph.map(
      (para: any) => `
      <p style="margin: 9px 0;padding: 0;font-family: sans-serif;background-color: #ffffff;color: rgb(24, 24, 24);">
        ${para.trim()}.
      </p>
    `
    );

    const htmlTableContent = `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" style="margin: 0;padding: 0;font-family: sans-serif;background-color: #ffffff;">
    <head style="margin: 0;padding: 0;font-family: sans-serif;background-color: #ffffff;">
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" style="margin: 0;padding: 0;font-family: sans-serif;background-color: #ffffff;">
      <meta http-equiv="X-UA-Compatible" content="IE=edge" style="margin: 0;padding: 0;font-family: sans-serif;background-color: #ffffff;">
      <meta name="viewport" content="width=device-width, initial-scale=1.0" style="margin: 0;padding: 0;font-family: sans-serif;background-color: #ffffff;">
      <title style="margin: 0;padding: 0;font-family: sans-serif;background-color: #ffffff;">HTML Email Template</title>
    </head>
    <body style="margin: 0;padding: 0;font-family: sans-serif;background-color: #ffffff;">
      <center class="wrapper" style="margin: 0;padding: 0;font-family: sans-serif;background-color: #ffffff;width: 100%;table-layout: fixed;padding-bottom: 60px;">
        <table class="main" width="100%" style="margin: 0 auto;padding: 16px;font-family: sans-serif;background-color: #ffffff;border-spacing: 0;width: 100%;max-width: 600px;color: #333;">
          <!-- <tr>
            <td height="7" style="background-color: #005250"></td>
          </tr> -->

          <!-- HEADING AND BANNER IMAGE -->
          <tr style="margin: 0;padding: 0;font-family: sans-serif;background-color: #ffffff;">
            <td style="margin: 0;padding: 0;font-family: sans-serif;background-color: #ffffff;">
              <h1 style="color: #333;font-size: 24px;padding: 9px 0;margin: 0;font-family: sans-serif;background-color: #ffffff;">
                ${mailData.heading}
              </h1>
              <a href="https://staybook.in" target="_blank" style="margin: 0;padding: 0;font-family: sans-serif;background-color: #ffffff;">
                <img width="100%" src="${
                  mailData.imageLink
                }" alt="promotion_Image" style="margin: 0;padding: 0;font-family: sans-serif;background-color: #ffffff;border: 0;">
              </a>
            </td>
          </tr>

          <!-- TEXT SECTION -->
          <tr style="margin: 0;padding: 0;font-family: sans-serif;background-color: #ffffff;">
            <td style="padding: 18px 0;margin: 0;font-family: sans-serif;background-color: #ffffff;">
              ${individualPara.join("\n")}
            </td>
          </tr>

          <!-- FOOTER SECTION/SIGNATURE AREA -->
          ${mailData.signature}
        </table>
      </center>
    </body>
    </html>
    `;

    let transporter = nodemailer.createTransport({
      host: smtpData.host,
      port: smtpData.port || 465,
      secure: true,
      auth: {
        user: smtpData.user,
        pass: smtpData.pass,
      },
    });

    const info = await transporter.sendMail({
      from: process.env.NODEMAILER_EMAIL,
      bcc: process.env.NODEMAILER_EMAIL,
      to: recipientEmail,
      subject: mailData.subject,
      text: mailData.heading,
      html: htmlTableContent,
    });

    return NextResponse.json(
      {
        message: `Email sent successfully to ${recipientEmail}`,
        messageId: info.messageId,
        recipientEmail: recipientEmail,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        err: error,
        message: "Method not allowed.",
      },
      { status: 405 }
    );
  }
}
