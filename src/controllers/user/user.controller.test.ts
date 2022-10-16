
import { Database} from '../../database/db';
import {generateUsersData, generateUserPayload, generateUserData} from '../../../utils/testData';
import UserController from './user.controller';

afterEach(() => {
  jest.resetAllMocks()
})

describe("UserController", () => {
  describe("getUsers", () => {
    test("should return empty array", async () => {
      const spy = jest.spyOn(Database, 'findAll').mockResolvedValueOnce([])
      const controller = new UserController();
      const users = await controller.getUsers();
      expect(users).toEqual([])
      expect(spy).toHaveBeenCalledWith()
      expect(spy).toHaveBeenCalledTimes(1)
    })

    test("should return user list", async () => {
      const usersData = generateUsersData(2)
      const spy = jest.spyOn(Database, 'findAll').mockResolvedValueOnce(usersData)
      const controller = new UserController();
      const users = await controller.getUsers();
      expect(users).toEqual(usersData)
      expect(spy).toHaveBeenCalledWith()
      expect(spy).toHaveBeenCalledTimes(1)
    })
  })

  describe("addUser", () => {
    test("should add user to the database", async () => {
      const payload = generateUserPayload()
      const userData = generateUserData(payload)
      const spy = jest.spyOn(Database, 'create').mockResolvedValueOnce(userData)
      const controller = new UserController();
      const user = await controller.createUser(payload);
      expect(user).toMatchObject(payload)
      expect(user).toEqual(userData)
      expect(spy).toHaveBeenCalledWith(payload)
      expect(spy).toHaveBeenCalledTimes(1)
    })
  })

  describe("getUser", () => {
    test("should return user from the database", async () => {
      const id = 1
      const userData = generateUserData({id})
      const spy = jest.spyOn(Database, 'findById').mockResolvedValueOnce(userData)
      const controller = new UserController();
      const user = await controller.getUser(id.toString());
      expect(user).toEqual(userData)
      expect(spy).toHaveBeenCalledWith(id)
      expect(spy).toHaveBeenCalledTimes(1)
    })

    test("should return null if user not found", async () => {
      const id = 1
      const spy = jest.spyOn(Database, 'findById').mockResolvedValueOnce(null)
      const controller = new UserController();
      const user = await controller.getUser(id.toString());
      expect(user).toBeNull()
      expect(spy).toHaveBeenCalledWith(id)
      expect(spy).toHaveBeenCalledTimes(1)
    })
  })
})