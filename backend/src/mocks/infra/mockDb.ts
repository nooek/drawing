export default class MockDb {
  public createdInstances: Array<any>;

  constructor(createdInstances: Array<any>) {
    this.createdInstances = createdInstances;
  }

  get getInstances(): Array<any> {
    return this.createdInstances;
  }

  setInstance(newUser: any) {
    this.createdInstances = [...this.createdInstances, newUser];
  }

  find(property: string, value: string | number) {
    const user = this.createdInstances.filter((user) => user[property] === value);
    return user;
  }

  clean() {
    this.createdInstances = [];
  }
}
