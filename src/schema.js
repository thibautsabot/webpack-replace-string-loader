const schema = {
  type: 'object',
  properties: {
    matchingArray: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          match: {
            type: 'string',
          },
          replace: {
            type: 'string',
          },
        },
        additionalProperties: false,
        required: ['match', 'replace'],
      },
    },
  },
  required: ['matchingArray'],
  additionalProperties: false,
}

export default schema
