import { SESClient } from '@aws-sdk/client-ses'
import configClient from '@/lib/utils/configClient'
import nodemailer from 'nodemailer'

const client = new SESClient(configClient)
const transporter = nodemailer.createTransport({
  SES: { client }
})

const sendRawEmailPdfCommand = async (from, to, subject, text, url) => {
  try {
    const sendEmailPDF = transporter.sendMail({
      from,
      to,
      subject,
      text,
      attachments: [
        {
          filename: 'report.pdf',
          path: url
        }
      ]
    })
    console.log('🚀 ~ sendRawEmailPdf ~ endEmailPDF:', sendEmailPDF)
  } catch (error) {
    console.error(err)
  }
}

export { sendRawEmailPdfCommand }
