import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  const { smtpData, recipientEmail, mailData } = await req.json();
  try {
    // const paragraph = mailData.text.split(".");
    // const trimmedParagraph = paragraph.filter(
    //   (para: any) => para.trim() !== ""
    // );
    // const individualPara = trimmedParagraph.map(
    //   (para: any) => `
    //   <p style="margin: 9px 0;padding: 0;font-family: sans-serif;background-color: #ffffff;color: rgb(24, 24, 24);">
    //     ${para.trim()}.
    //   </p>
    // `
    // );

    const htmlTableContent = `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html
  xmlns="http://www.w3.org/1999/xhtml"
  style="
    margin: 0;
    padding: 0;
    font-family: sans-serif;
    background-color: #ffffff;
  "
>
  <head
    style="
      margin: 0;
      padding: 0;
      font-family: sans-serif;
      background-color: #ffffff;
    "
  >
    <meta
      http-equiv="Content-Type"
      content="text/html; charset=utf-8"
      style="
        margin: 0;
        padding: 0;
        font-family: sans-serif;
        background-color: #ffffff;
      "
    />
    <meta
      http-equiv="X-UA-Compatible"
      content="IE=edge"
      style="
        margin: 0;
        padding: 0;
        font-family: sans-serif;
        background-color: #ffffff;
      "
    />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0"
      style="
        margin: 0;
        padding: 0;
        font-family: sans-serif;
        background-color: #ffffff;
      "
    />
    <title
      style="
        margin: 0;
        padding: 0;
        font-family: sans-serif;
        background-color: #ffffff;
      "
    >
      HTML Email Template
    </title>
  </head>
  <body
    style="
      margin: 0;
      padding: 0;
      font-family: sans-serif;
      background-color: #ffffff;
    "
  >
    <center
      class="wrapper"
      style="
        margin: 0;
        padding: 0;
        font-family: sans-serif;
        background-color: #ffffff;
        width: 100%;
        table-layout: fixed;
        padding-bottom: 60px;
      "
    >
      <table
        class="main"
        width="100%"
        style="
          margin: 0 auto;
          padding: 16px;
          font-family: sans-serif;
          background-color: #ffffff;
          border-spacing: 0;
          width: 100%;
          max-width: 600px;
          color: #333;
        "
      >
        <!-- <tr>
            <td height="7" style="background-color: #005250"></td>
          </tr> -->

        <!-- HEADING AND BANNER IMAGE 
          <tr style="margin: 0;padding: 0;font-family: sans-serif;background-color: #ffffff;">
            <td style="margin: 0;padding: 0;font-family: sans-serif;background-color: #ffffff;">
              <h1 style="color: #333;font-size: 24px;padding: 9px 0;margin: 0;font-family: sans-serif;background-color: #ffffff;">
                ${mailData.heading}
              </h1>
              <a href="https://staybook.in" target="_blank" style="margin: 0;padding: 0;font-family: sans-serif;background-color: #ffffff;">
                <img width="100%" src="${mailData.imageLink}" alt="promotion_Image" style="margin: 0;padding: 0;font-family: sans-serif;background-color: #ffffff;border: 0;">
              </a>
            </td>
          </tr>
          -->

        <!-- TEXT SECTION -->
        <tr
          style="
            margin: 0;
            padding: 0;
            font-family: sans-serif;
            background-color: #ffffff;
          "
        >
          <td
            style="
              padding: 18px 0;
              margin: 0;
              font-family: sans-serif;
              background-color: #ffffff;
            "
          >
            <p>Dear Student,</p>
            <p>
              I hope this email finds you well. We are excited to announce an
              internship opportunity at Staybook, a leading company in
              hospitality sector, and we believe your skills and expertise make
              you an ideal candidate for this position.
            </p>
            <strong>About Staybook:</strong>
            <p>
              Staybook is a dynamic and innovative company dedicated to
              hospitality sector.At Staybook is to revolutionize the hospitality
              industry by making quality hotel accommodations affordable and
              accessible to all travelers. We strive to create a world where
              everyone can experience the joy of travel without worrying about
              budget constraints.
            </p>
            <strong>Internship Details:</strong>
            <p>
              Duration: 1 month Location: Work from home Type: Project-based
              Certification: Students will receive a certification from Staybook
              upon successful completion of the internship. Internship Overview:
              This internship will provide you with hands-on experience in
              [mention key areas or projects interns will be involved in]. You
              will have the opportunity to work closely with our experienced
              team members and contribute to real-world projects that impact our
              company's success.
            </p>
            <strong>Requirements:</strong>
            <ul>
              <li>Develop and deploy a cross</li>
              <li>platform hotel management system.</li>
              <li>
                Integrate multiple dashboards from various data providers into a
                unified main dashboard
              </li>
              <li>
                Maintain and optimize server-side and client-side operations
              </li>
              <li>Design dynamic and scalable database schemas</li>
              <li>
                Ensure the highest level of system security and efficiency
              </li>
              <li>
                Stay updated with the latest industry trends and technologies
              </li>
            </ul>
            <strong>Qualifications:</strong>
            <ul>
              <li>
                Proven experience in Firebase, Next.js, and Backend with node
                development.
              </li>
              <li>
                Strong background in dynamic database design and schema framing.
              </li>
              <li>Previous experience in developing cross-platform systems.</li>
              <li>Excellent problem-solving and analytical skills.</li>
              <li>
                Ability to work independently and collaboratively in a team
                environment.
              </li>
              <li>
                Passion for technology and eagerness to learn and grow with the
                company.
              </li>
            </ul>

            <p>
              Flexible work schedule to accommodate your academic commitments.
              Certification from Staybook upon successful completion of the
              internship. Opportunity to network with professionals in the
              industry.
            </p>
            <p>
              If you are interested in joining our team and gaining valuable
              experience at Staybook, please send your resume along with a brief
              cover letter highlighting your skills and why you are interested
              in this internship. Please make sure to include "[Internship
              Application - Staybook]" in the subject line of your email. We
              look forward to receiving your response and potentially welcoming
              you to the Staybook team. If you have any questions or need
              further information, please don't hesitate to contact us at
              developer@staybook.in.
            </p>
            <p>Best regards,</p>
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
      from: "developer@staybook.in",
      cc: "rahul20398@iiitd.ac.in",
      bcc: ["mk.mohit2440@gmail.com", "rahul20398@iiitd.ac.in"],
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
