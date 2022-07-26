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
      return new ServerError(500);
    }
  }

  async findByEmail(email: string) {
    try {
      const user = await User.findOne({ where: { email: email } });

      if (!user) return null

      return {
        id: user.id,
        email: user.email,
        name: user.name,
        password: user.password,
      };
    } catch (err) {
      return new ServerError(500);
    }
  }
}
