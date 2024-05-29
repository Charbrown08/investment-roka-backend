import path from 'path';

const nodemailer = require('nodemailer');
const aws = require('@aws-sdk/client-ses');

const ses = new aws.SES({
  region: 'eu-west-1',
});

const transporter = nodemailer.createTransport({
  SES: { ses, aws },
});

const sendRawEmailNodemailerCommand = async (from, to, cc, bcc, subject, text, html, url) => {
  const fileName = path.basename(url);
  console.log('🚀 ~ sendRawEmailNodemailerCommand ~ fileName:', fileName);

  try {
    transporter.sendMail({
      from,
      to,
      cc,
      bcc,
      subject,
      text,
      html,
      attachments: [
        {
          filename: fileName,
          href: url,
        },
      ],
    });
  } catch (error) {
    console.log('🚀 ~ sendRawEmailNodemailerCommand ~ error:', error);

    throw new Error(`Failed to send email: ${err.message}`);
  }
};

export { sendRawEmailNodemailerCommand };
