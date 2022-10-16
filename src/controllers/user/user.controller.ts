import { Get, Route, Tags,  Post, Body, Path, Delete } from "tsoa";
import { IUser} from '../../interfaces/user';
import { Database} from '../../database/db';

@Route("users")
@Tags("User")
export default class UserController {
  @Get("/")
  public async getUsers(): Promise<IUser[]> {
    return await Database.findAll();
  }

  @Post("/")
  public async createUser(@Body() body: any): Promise<Record<string, any>> {
    return await Database.create(body);
  }

  @Get("/:id")
  public async getUser(@Path() id: string): Promise<IUser | null> {
    return await Database.findById(Number(id));
  }

  @Delete("/:id")
  public async deleteUser(@Path() id: string): Promise<IUser | null> {
    return await Database.delete(Number(id));
  }
}