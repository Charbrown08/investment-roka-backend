const sendRawEmailNodemailerSchema = {
  type: 'object',
  properties: {
    body: {
      type: 'object',
      required: ['from', 'to', 'subject', 'text'],
      additionalProperties: false,
      properties: {
        from: { type: 'string' },
        to: {
          type: 'array',
          items: {
            type: 'string',
            format: 'email'
          }
        },
        subject: { type: 'string' },
        text: { type: 'string' },
        url: { type: 'string', format: 'url' }
      }
    }
  }
}

export { sendRawEmailNodemailerSchema }
