const createUserSchema = {
  type: 'object',
  properties: {
    body: {
      type: 'object',
      required: ['id'],
      additionalProperties: false,
      properties: {
        id: {
          type: 'string',
          transform: ['trim', 'toUpperCase'],
          minLength: 1,
          maxLength: 35,
          pattern: '^[a-zA-Z0-9-_]+$'
        },
        name: {
          type: 'string',
          transform: ['trim', 'toUpperCase'],
          minLength: 1,
          maxLength: 50,
          pattern: '^[a-zA-ZñÑ ]+$'
        },
        lastName: {
          type: 'string',
          transform: ['trim', 'toUpperCase'],
          minLength: 1,
          maxLength: 50,
          pattern: '^[a-zA-ZñÑ ]+$'
        },
        email: { type: 'string', format: 'email' },
        numbersPhone: { type: 'string' },
        address: { type: 'string', transform: ['trim', 'toUpperCase'] },
        city: { type: 'string', transform: ['trim', 'toUpperCase'] },
        profesion: { type: 'string', transform: ['trim', 'toUpperCase'] },
        age: { type: 'number', minimum: 18, maximum: 99 }
      }
    }
  }
}
export default createUserSchema
