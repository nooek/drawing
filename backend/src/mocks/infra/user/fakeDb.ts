import UserAttributes from "../../../types/UserType";

export default class Users {
  public createdUsers: Array<UserAttributes>;

  constructor(createdUsers: Array<UserAttributes>) {
    this.createdUsers = createdUsers;
  }

  get getUsers(): Array<UserAttributes> {
    return this.createdUsers;
  }

  setUsers(newUser: UserAttributes) {
    this.createdUsers = [...this.createdUsers, newUser];
  }

  findByEmail(email: string) {
    const user = this.createdUsers.filter((user) => user.email === email);
    return user;
  }

  clean() {
    this.createdUsers = [];
  }
}
