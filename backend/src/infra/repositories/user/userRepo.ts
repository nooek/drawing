import User from "../../../models/UserModel";
import UserAttributes from "../../../types/UserType";
import { ServerError } from "../../../utils/errors";

export default class UserRepo {
  async create(userData: UserAttributes) {
    try {
      const user = await User.build({
        id: userData.id,
        name: userData.name,
        email: userData.email,
        password: userData.password,
      });
      user.save();
      return user;
    } catch (err) {
      throw new ServerError({
        statusCode: 500,
        body: {
          message: "An error ocurred.",
        },
      });
    }
  }

  async findByEmail(email: string) {
    try {
      const user = await User.findOne({ where: { email: email } });

      return {
        id: user ? user.id : null,
        email: user ? user.email : null,
        name: user ? user.name : null,
        password: user ? user.password : null,
      };
    } catch (err) {
      throw new ServerError({
        statusCode: 500,
        body: {
          message: "An error ocurred.",
        },
      });
    }
  }
}
