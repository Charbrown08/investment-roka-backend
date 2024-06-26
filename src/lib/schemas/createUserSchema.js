const createUserSchema = {
  type: 'object',
  properties: {
    body: {
      type: 'object',
      required: [
        'id',
        'name',
        'surname',
        'profession',
        'companyName',
        'phoneNumbers',
        'homeAddress',
        'workAddress',
        'guarantorName',
        'guarantorPhone',
        'guarantorAddress',
        'loanAmount',
        'loanDate',
        'interestRate'
      ],
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
        surname: {
          type: 'string',
          transform: ['trim', 'toUpperCase'],
          minLength: 1,
          maxLength: 50,
          pattern: '^[a-zA-ZñÑ ]+$'
        },
        age: { type: 'number', minimum: 18, maximum: 99 },
        city: { type: 'string', transform: ['trim', 'toUpperCase'] },
        email: { type: 'string', format: 'email' },
        profession: { type: 'string', transform: ['trim', 'toUpperCase'] },
        companyName: {
          type: 'string',
          transform: ['trim', 'toUpperCase'],
          minLength: 1,
          maxLength: 100
        },
        phoneNumbers: {
          type: 'array',
          items: { type: 'string' }
        },
        homeAddress: { type: 'string' },
        workAddress: { type: 'string' },
        guarantorName: {
          type: 'string',
          transform: ['trim', 'toUpperCase'],
          minLength: 1,
          maxLength: 100
        },
        guarantorPhone: {
          type: 'string',
          transform: ['trim'],
          minLength: 1,
          maxLength: 20
        },
        guarantorAddress: { type: 'string' },
        loanAmount: { type: 'number' },
        loanDate: { type: 'string' },
        interestRate: { type: 'number' },
        interestPaid: { type: 'boolean', transform: ['trim'] },
        status: { type: 'boolean', transform: ['trim'] }
      }
    }
  }
}

export default createUserSchema
