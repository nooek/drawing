import { user } from "../../../../domain/entities";
import UserAttributes from "../../../../types/UserType";
import HashPasswordInterface from "../../../../interfaces/helpers/hashPasswordInterface";
import { BaseResponseConstructor } from "../../../../utils/errors/interfaces";
export default class CreateUserUsecase {
  private userDb;
  public uuid;
  private hashPassword: HashPasswordInterface;
  private UnauthorizedError: BaseResponseConstructor

  constructor(
    userDb: any,
    uuid: Function,
    hashPassword: HashPasswordInterface,
    UnauthorizedError: BaseResponseConstructor,
  ) {
    this.userDb = userDb;
    this.uuid = uuid;
    this.hashPassword = hashPassword;
    this.UnauthorizedError = UnauthorizedError;
  }

  async execute(userData: UserAttributes) {
    const userEntity = await user.create({
      id: this.uuid(),
      name: userData.name,
      email: userData.email,
      password: userData.password,
    });
    if (userEntity instanceof Error) return userEntity
    console.log(userEntity);

    const hashedPassword = await this.hashPassword.hash(userEntity.getPassword());

    const userExists = await this.userDb.findByEmail(userData.email);
    if (userExists !== null) {
      return new this.UnauthorizedError(400, {
        message: "User already exists",
      });
    }

    const createdUser = await this.userDb.create({
      id: userEntity.getId(),
      name: userEntity.getName(),
      email: userEntity.getEmail(),
      password: hashedPassword,
    });

    if (createdUser instanceof Error) return createdUser

    return {
      statusCode: 200,
      body: {
        id: userEntity.getId(),
        name: userEntity.getName(),
        email: userEntity.getEmail(),
      },
    };
  }
}
