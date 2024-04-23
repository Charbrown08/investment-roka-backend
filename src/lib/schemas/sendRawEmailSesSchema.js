const sendRawEmailSesSchema = {
  type: 'object',
  properties: {
    body: {
      type: 'object',
      required: ['source', 'destinations', 'rawData'],
      additionalProperties: false,
      properties: {
        source: { type: 'string', format: 'email' },
        destinations: {
          type: 'array',
          items: {
            type: 'string',
            format: 'email'
          }
        },
        rawData: { type: 'string' },
        fromArn: {
          type: 'string',
          pattern: 'arn:aws:ses:[a-z0-9-]+:[0-9]{12}:identity/[a-zA-Z0-9._-]+'
        },
        sourceArn: {
          type: 'string',
          pattern: 'arn:aws:ses:[a-z0-9-]+:[0-9]{12}:identity/[a-zA-Z0-9._-]+'
        },
        returnPathArn: {
          type: 'string',
          pattern: 'arn:aws:ses:[a-z0-9-]+:[0-9]{12}:identity/[a-zA-Z0-9._-]+'
        },
        configSetname: { type: 'string' }
      }
    }
  }
}

export { sendRawEmailSesSchema }
