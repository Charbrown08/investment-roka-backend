import path from 'path'

const nodemailer = require('nodemailer')
const aws = require('@aws-sdk/client-ses')

const ses = new aws.SES({
  region: 'eu-west-1'
})

let transporter = nodemailer.createTransport({
  SES: { ses, aws }
})

const sendRawEmailNodemailerCommand = async (from, to, subject, texBody, url) => {
  const fileName = path.basename(url)
  try {
    transporter.sendMail({
      from: from,
      to: to,
      subject: subject,
      text: texBody,
      attachments: [
        {
          filename: fileName,
          href: url
        }
      ]
    })
  } catch (error) {
    console.log(error)
  }
}

export { sendRawEmailNodemailerCommand }
