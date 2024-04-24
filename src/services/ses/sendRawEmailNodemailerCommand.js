import { url } from 'inspector'

const nodemailer = require('nodemailer')
const aws = require('@aws-sdk/client-ses')
const { defaultProvider } = require('@aws-sdk/credential-provider-node')

const ses = new aws.SES({
  apiVersion: '2010-12-01',
  region: 'eu-west-1'
  // defaultProvider
})

let transporter = nodemailer.createTransport({
  SES: { ses, aws }
})

const sendRawEmailNodemailerCommand = async (from, to, subject, texBody, url) => {
  console.log('🚀 ~ sendRawEmailNodemailerCommand ~ url:', url)
  console.log('🚀 ~ sendRawEmailNodemailerCommand ~ texBody:', texBody)
  console.log('🚀 ~ sendRawEmailNodemailerCommand ~ subject:', subject)
  console.log('🚀 ~ sendRawEmailNodemailerCommand ~  to:', to)
  console.log('🚀 ~ sendRawEmailNodemailerCommand ~ from,:', from)

  transporter.sendMail(
    {
      from: from,
      to: to,
      subject: subject,
      text: texBody,
      attachments: [
        {
          filename: 'test.txt',
          content: url
        },
        {
          filename: 'test.pdf',
          href: url
        }
      ],
      ses: {
        // optional extra arguments for SendRawEmail
        Tags: [
          {
            Name: 'tag_name',
            Value: 'tag_value'
          }
        ]
      }
    },
    (err, info) => {
      // console.log(info.envelope)
      // console.log(info.messageId)
      console.log(err)
    }
  )
}

export { sendRawEmailNodemailerCommand }
