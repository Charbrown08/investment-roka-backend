const getUserSchema = {
  type: 'object',
  properties: {
    pathParameters: {
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
        }
      }
    }
  }
}
export default getUserSchema
