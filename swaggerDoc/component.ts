import { User as _User } from './schema/user';

export const component = {
  securitySchemes: {
    bearerAuth: {
      type: "http",
      scheme: "bearer",
      bearerFormat: "JWT",
      in: "header"
    }
  },
  schema: {
    User: _User,
    Error: {
      type: 'object',
      properties: {
        httpStatusCode: {
          type: "number"
        },
        errorCode: {
          type: "string"
        },
        message: {
          type: 'string'
        },
      },
    },
    Delete: {
      type: 'object',
      properties: {
        id: {
          type: "number"
        },
        message: {
          type: 'string'
        },
      },
    }
  }
};