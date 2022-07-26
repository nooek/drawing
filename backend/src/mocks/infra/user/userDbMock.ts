import UserRepo from "../../../infra/repositories/user/userRepo";
import { ServerError } from "../../../utils/errors";
import Users from "./fakeDb"

export const createdUsers = new Users([])

export const mockCreate = jest.fn((userData) => {
  if (!userData.id) return new ServerError(500)
  if (!userData.name) return new ServerError(500)
  if (!userData.email) return new ServerError(500)
  if (!userData.password) return new ServerError(500)

  const newUser = {
    id: userData.id,
    name: userData.name,
    email: userData.email,
    password: userData.password,
  };

  createdUsers.setUsers(newUser)
  console.log(createdUsers)
  return newUser
});

export const mockFindByEmail = jest.fn((email?: string) => {
  if (!email) return new ServerError(500)
  
  const user = createdUsers.findByEmail(email)

  if (!user[0]) return null
  if (!user[0].id) return null

  return {
    id: user[0].id,
    email: user[0].email,
    name: user[0].name,
    password: user[0].password,
  };
})

const mock = jest.fn().mockImplementation(() => {
  return {
    create: mockCreate,
    findByEmail: mockFindByEmail
  };
});

export default mock;
