import nodemailer from "nodemailer";
import mjml2html from "mjml";
import { EMAIL_PASS, EMAIL_USER } from "../secrets";

export const sendInvoiceMail = async (order: any) => {
  const mjmlTemplate = `<mjml>
  <mj-head>
    <mj-attributes>
      <mj-all font-family="'Inter', Helvetica, Arial, sans-serif"></mj-all>
      <mj-text font-size="16px" color="#4a4a4a" line-height="24px"></mj-text>
    </mj-attributes>
  </mj-head>
  <mj-body background-color="#ffffff">
    <mj-section padding-top="40px">
      <mj-column>
        <mj-text align="center" font-size="20px" font-weight="900" color="#1a202c">
          KHALED HABIB Store
        </mj-text>
      </mj-column>
    </mj-section>

    <mj-section padding="20px">
      <mj-column border="1px solid #e2e8f0" border-radius="12px" padding="30px">
        <mj-image width="64px" src="https://cdn-icons-png.flaticon.com/512/9321/9321300.png"></mj-image>
        
        <mj-text align="center" font-size="24px" font-weight="800" color="#1a202c" padding-top="20px">
          Hi ${order.user.name}},
        </mj-text>
        
        <mj-text align="center" font-size="18px" font-weight="600" color="#2d3748">
          Your order is confirmed!
        </mj-text>
        
        <mj-text align="center" color="#718096" padding-bottom="30px">
          Thanks for shopping with us. We've attached your official invoice as a PDF to this email for your records.
        </mj-text>

        <mj-button background-color="#1a202c" color="#ffffff" font-weight="600" border-radius="8px" href="https://github.com/khaledhabib18/">
          View Order History
        </mj-button>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>`;

  async function sendGmail() {
    const { html } = mjml2html(mjmlTemplate);
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });
    const mailOptions = {
      from: '"Khaled Habib" <khaled.habib18@gmail.com>',
      to: `${order.user.email}`,
      subject: "Generated PDF Report",
      html: html,
      attachments: [
        {
          filename: "inventory.pdf",
          path: `D:/Software_Engineering/Training/ecommerce-prisma-typescript/simple-eshop/public/pdfs/invoice-${order.id}.pdf`,
        },
      ],
    };
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log("Email sent successfully: " + info.response);
    } catch (error) {
      console.error("Error sending email:", error);
    }
  }

  sendGmail();
};
