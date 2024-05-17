const sendRawEmailNodemailerSchema = {
  type: 'object',
  properties: {
    body: {
      type: 'object',
      required: ['from', 'subject'],
      additionalProperties: false,
      properties: {
        from: { type: 'string', format: 'email' },
        to: {
          type: 'array',
          items: {
            type: 'string',
            format: 'email'
          }
        },
        cc: {
          type: 'array',
          items: {
            type: 'string',
            format: 'email'
          }
        },
        bcc: {
          type: 'array',
          items: {
            type: 'string',
            format: 'email'
          }
        },
        subject: { type: 'string' },
        text: { type: 'string' },
        html: { type: 'string' },
        url: { type: 'string', format: 'url' }
      }
    }
  }
}

export { sendRawEmailNodemailerSchema }
