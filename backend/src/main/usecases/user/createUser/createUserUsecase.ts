import { user } from "../../../../domain/entities";
import UserAttributes from "../../../../types/UserType"

export default class CreateUserUsecase {
  private userDb;
  public uuid;
  private hashPassword;

  constructor(userDb: any, uuid: Function, hashPassword: Function) {
    this.userDb = userDb;
    this.uuid = uuid;
    this.hashPassword = hashPassword;
  }

  async execute(userData: UserAttributes) {
    const userEntity = await user.create({
      id: this.uuid(),
      name: userData.name,
      email: userData.email,
      password: userData.password,
    });

    const hashedPassword = await this.hashPassword(userEntity.getPassword())

    const createdUser = await this.userDb.create({
      id: userEntity.getId(),
      name: userEntity.getName(),
      email: userEntity.getEmail(),
      password: hashedPassword,
    });

    if (!createdUser) {
      throw new Error(`Some error happened: ${createdUser}`)
    }

    return {
      message: "Success",
      statusCode: 200,
      user: createdUser
    };
  }
}
