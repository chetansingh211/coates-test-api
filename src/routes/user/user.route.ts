import express from "express";
import Ajv from "ajv"
import UserController from '../../controllers/user/user.controller';

const router = express.Router();


const ajv = new Ajv();

// user json object
const userSchema = {
  type: "object",
  properties: {
    email: {type: "string", pattern: "^\\S+@\\S+\\.\\S+$",},
    name: {type: "string"},
    dob: {type: "string"}
  },
  required: ["email", "name", "dob"],
  additionalProperties: false,
};

function errorResponse(schemaErrors: any) {
  const errors = schemaErrors.map((error: any) => {
    return {
      path: error.dataPath,
      message: error.message
    }
  })
  return {
    status: 'failed',
    errors
  }
}

const validateSchema = (schema: any) => {
  return (req: any, res: any, next: any) => {
    const valid = ajv.validate(schema, req.body);
    if (!valid) {
      return res.status(422).send(errorResponse(ajv.errors));
    }
    next();
  }
}

router.get("/", async (_req, res) => {
  const controller = new UserController();
  const response = await controller.getUsers();
  return res.send(response);
});

router.post("/", validateSchema(userSchema), async (req, res) => {
  const controller = new UserController();
  const response = await controller.createUser(req.body);
  return res.send(response);
});

router.get("/:id", async (req, res) => {
  const controller = new UserController();
  const response = await controller.getUser(req.params.id);
  if (!response) res.status(404).send({message: "No user found"})
  return res.send(response);
});

router.delete("/:id", async (req, res) => {
  const controller = new UserController();
  const response = await controller.deleteUser(req.params.id);
  if (!response) res.status(404).send({message: "No user found"})
  return res.send(response);
});

export default router