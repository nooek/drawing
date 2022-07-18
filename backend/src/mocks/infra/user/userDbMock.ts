import UserRepo from "../../../infra/repositories/user/userRepo";
import Users from "./fakeDb"

export const createdUsers = new Users([])

export const mockCreate = jest.fn((userData) => {
  if (!userData.id) throw new Error();
  if (!userData.name) throw new Error();
  if (!userData.email) throw new Error();
  if (!userData.password) throw new Error();
  console.log("Passou")

  const newUser = {
    id: "fake_id",
    name: userData.name,
    email: userData.email,
    password: userData.password,
  };

  createdUsers.setUsers(newUser)
  return newUser
});

export const mockFindByEmail = jest.fn((email: string) => {
  if (!email) throw new Error()
  
  const user = createdUsers.findByEmail(email)
  return {
    id: user.length ? user[0].id : null,
    email: user.length ? user[0].email : null,
    name: user.length ? user[0].name : null,
    password: user.length ? user[0].password : null,
  };
})

const mock = jest.fn().mockImplementation(() => {
  return {
    create: mockCreate,
    findByEmail: mockFindByEmail
  };
});

export default mock;
