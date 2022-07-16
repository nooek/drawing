import User from "../../../models/UserModel";
import UserAttributes from "../../../types/UserType"

export default class UserRepo {
  async create(userData: UserAttributes) {
    try {
      const user = await User.build({
        id: userData.id,
        name: userData.name,
        email: userData.email,
        password: userData.password
      })
      user.save()
      return user
    } catch(err) {
      console.log(err)
      return err
    }     
  }
}
