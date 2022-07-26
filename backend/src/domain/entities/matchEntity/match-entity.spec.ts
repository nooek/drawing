import Match from "./MatchEntity";
import { InvalidParamError, MissingParamError } from "../../../utils/errors";

const makeSut = () => {
  const match = new Match(() => "fakeid", InvalidParamError, MissingParamError)
  return match
}

describe("Test match entity", () => {
  it("Should return an entity", () => {
    const validEntity = {
      id: "fakeid",
      name: "fakematch",
      category: "fakecategory",
      password: "fakepassword",
      maxPlayers: 10,
      creatorId: "fakecreator"
    }

    const sut = makeSut()
    const match = sut.create(validEntity)

    expect(match.getCreatorId()).toBe(validEntity.creatorId)
  })

  it("Should throw for invalid name", () => {
    const validEntity = {
      id: "fakeid",
      name: "x",
      category: "fakecategory",
      password: "fakepassword",
      maxPlayers: 10,
      creatorId: "fakecreator"
    }

    const sut = makeSut()
    const match = sut.create(validEntity)

    console.log(match)

    expect(sut.create(validEntity)).toThrow()
  })
})
