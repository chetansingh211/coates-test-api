import { CreateUser, User } from '../schema/user';
import { component } from '../component';

export default {
  '/user': {
    get:{
      tags: ['User'],
      summary: "List users",
      operationId: 'getUsers',
      parameters: [],
      responses:{
        '200':{
          description:"User were obtained",
          content:{
            'application/json':{
              schema:{
                ...User
              }
            }
          }
        }
      }
    },
    post:{
      tags: ['User'],
      summary: "Create a user",
      operationId: 'postUser',
      parameters: [],
      requestBody: {
        content: {
          "application/json": {
            schema:{
              ...CreateUser
            }
          },
        },
      },
      responses:{
        '200':{
          description:"user has been created",
          content:{
            'application/json':{
              schema:{
                ...User
              }
            }
          }
        }
      }
    }
  },
  '/user/{id}': {
    get:{
      tags: ['User'],
      summary: "List user by id",
      operationId: 'getUser',
      parameters: [
        {
          name: "id",
          in: "path",
          description: "ID of user to return",
          required: true,
          type: "integer",
          format: "int64"
        }
      ],
      responses:{
        '200':{
          description:"User were obtained",
          content:{
            'application/json':{
              schema:{
                ...User
              }
            }
          }
        }
      }
    },
    delete: {
      tags: ['User'],
      summary: "Delete user by id",
      operationId: "deleteUser",
      parameters: [
        {
          name: "id",
          in: "path",
          description: "ID of user to delete",
          required: true,
          type: "integer",
          format: "int64"
        }
      ],
      responses:{
        '200':{
          description:"User is deleted",
          content:{
            'application/json':{
              schema:{
                ...component.schema.Delete
              }
            }
          }
        }
      },
    },
  },
}