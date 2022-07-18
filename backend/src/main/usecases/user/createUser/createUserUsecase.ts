import { user } from "../../../../domain/entities";
import UserAttributes from "../../../../types/UserType";

export default class CreateUserUsecase {
  private userDb;
  public uuid;
  private hashPassword;
  private UnauthorizedError;

  constructor(userDb: any, uuid: Function, hashPassword: any, UnauthorizedError: any) {
    this.userDb = userDb;
    this.uuid = uuid;
    this.hashPassword = hashPassword;
    this.UnauthorizedError = UnauthorizedError;
  }

  async execute(userData: UserAttributes) {
    try {
      const userEntity = await user.create({
        id: this.uuid(),
        name: userData.name,
        email: userData.email,
        password: userData.password,
      });
      console.log(userEntity)

      const hashedPassword = await this.hashPassword.hash(userEntity.getPassword());

      const userExists = await this.userDb.findByEmail(userData.email);

      if (userExists) {
        throw new this.UnauthorizedError({
          statusCode: 403,
          body: {
            message: "User already exists",
          },
        });
      }

      const createdUser = await this.userDb.create({
        id: userEntity.getId(),
        name: userEntity.getName(),
        email: userEntity.getEmail(),
        password: hashedPassword,
      });

      return {
        message: "Success",
        statusCode: 200,
        user: {
          id: userEntity.getId(),
          name: userEntity.getName(),
          email: userEntity.getEmail()
        },
      };
    } catch (err) {
      throw err;
    }
  }
}
