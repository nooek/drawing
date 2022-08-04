import Match from "./MatchEntity";
import { InvalidParamError, MissingParamError } from "../../../utils/errors";

const makeSut = (params: any) => {
  const match = new Match(() => "fakeid", InvalidParamError, MissingParamError)
  return {
    create: () => match.create(params)
  }
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

    const sut = makeSut(validEntity)
    const match = sut.create()

    expect(match.getCreatorId()).toBe(validEntity.creatorId)
  })

  it("Should throw for no name", () => {
    const invalidEntity = {
      id: "fakeid",
      category: "fakecategory",
      password: "fakepassword",
      maxPlayers: 10,
      creatorId: "fakecreator"
    }
    const sut = makeSut(invalidEntity)
    const match = sut.create()

    expect(match).toBeInstanceOf(MissingParamError)
  })

  it("Should throw for no category", () => {
    const invalidEntity = {
      id: "fakeid",
      name: "fakematch",
      password: "fakepassword",
      maxPlayers: 10,
      creatorId: "fakecreator"
    }
    const sut = makeSut(invalidEntity)
    const match = sut.create()

    expect(match).toBeInstanceOf(MissingParamError)
  })

  it("Should throw for no maximum players", () => {
    const invalidEntity = {
      id: "fakeid",
      name: "fakematch",
      category: "fakecategory",
      password: "fakepassword",
      creatorId: "fakecreator"
    }
    const sut = makeSut(invalidEntity)
    const match = sut.create()

    expect(match).toBeInstanceOf(MissingParamError)
  })

  it("Should throw for no creatorId", () => {
    const invalidEntity = {
      id: "fakeid",
      name: "fakematch",
      category: "fakecategory",
      password: "fakepassword",
      maxPlayers: 10,
    }
    const sut = makeSut(invalidEntity)
    const match = sut.create()

    expect(match).toBeInstanceOf(MissingParamError)
  })

  it("Should throw for lower than allowed name length", () => {
    const invalidEntity = {
      id: "fakeid",
      name: "x",
      category: "fakecategory",
      password: "fakepassword",
      maxPlayers: 10,
      creatorId: "fakecreator"
    }

    const sut = makeSut(invalidEntity)
    const match = sut.create()

    expect(match).toBeInstanceOf(InvalidParamError)
  })

  it("Should throw for higher than allowed name length", () => {
    const invalidEntity = {
      id: "fakeid",
      name: "xxxxxxxxxxxxxxxxxxxxxxxxxxxx",
      category: "fakecategory",
      password: "fakepassword",
      maxPlayers: 10,
      creatorId: "fakecreator"
    }

    const sut = makeSut(invalidEntity)
    const match = sut.create()

    expect(match).toBeInstanceOf(InvalidParamError)
  })

  it("Should throw for higher than allowed maxPlayers", () => {
    const invalidEntity = {
      id: "fakeid",
      name: "fakematch",
      category: "fakecategory",
      password: "fakepassword",
      maxPlayers: 300,
      creatorId: "fakecreator"
    }

    const sut = makeSut(invalidEntity)
    const match = sut.create()

    expect(match).toBeInstanceOf(InvalidParamError)
  })

  it("Should throw for lower than allowed maxPlayers", () => {
    const invalidEntity = {
      id: "fakeid",
      name: "fakematch",
      category: "fakecategory",
      password: "fakepassword",
      maxPlayers: 1,
      creatorId: "fakecreator"
    }

    const sut = makeSut(invalidEntity)
    const match = sut.create()

    expect(match).toBeInstanceOf(InvalidParamError)
  })

  it("Should throw for higher than allowed password length", () => {
    const invalidEntity = {
      id: "fakeid",
      name: "fakematch",
      category: "fakecategory",
      password: "fakepasswordxxxxxxxxxxxxxxxxxxxxxxxx",
      maxPlayers: 10,
      creatorId: "fakecreator"
    }

    const sut = makeSut(invalidEntity)
    const match = sut.create()

    expect(match).toBeInstanceOf(InvalidParamError)
  })

})
