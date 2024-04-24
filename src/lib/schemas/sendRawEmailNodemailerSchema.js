import { format } from 'path'

const sendRawEmailNodemailerSchema = {
  type: 'object',
  properties: {
    body: {
      type: 'object',
      required: ['from', 'to', 'subject'],
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
        subject: { type: 'string' },
        textBody: { type: 'string' },
        url: { type: 'string', format: 'url' }
      }
    }
  }
}

export { sendRawEmailNodemailerSchema }
