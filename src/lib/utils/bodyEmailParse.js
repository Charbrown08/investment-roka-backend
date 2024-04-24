const bodyEmailParse = async (data) => {
  const email = await simpleParser(data)
  return {
    messageId: email.messageId,
    date: email.date,
    subject: email.subject,
    text: email.text,
    from: email.from.text,
    attachments: email.attachments,
    to: email.to.text
  }
}

export { bodyEmailParse }
