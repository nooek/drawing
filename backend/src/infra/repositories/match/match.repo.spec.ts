import MatchRepoMock, {
  mockCreate,
  mockFindByCreatorId,
  createdMatchs,
} from "../../../mocks/infra/match/matchDbMock";
import { ServerError } from "../../../utils/errors";
import MatchRepo from "./matchRepo";

jest.mock("./matchRepo.ts", () => {
  return jest.fn().mockImplementation(() => {
    return {
      create: mockCreate,
      findByCreatorId: mockFindByCreatorId,
    };
  });
});

const makeSut = () => {
  return new MatchRepo()
}

describe("Test match repository", () => {
  beforeEach(() => {
    MatchRepoMock.mockClear()
    mockCreate.mockClear()
    mockFindByCreatorId.mockClear()
    createdMatchs.clean()
  })

  it ("should create a new match", async () => {
    const match = {
        id: "fake_id",
        name: "fake_name",
        password: "fake_password",
        category: "fake_category",
        maxPlayers: 10,
        status: "create",
        creatorId: "creator_id",
    }

    const sut = makeSut()
    const matchCreated = await sut.create(match)

    expect(matchCreated).toHaveProperty("id", match.id)
  })

  it ("should throw for no id", async () => {
    const match = {
        name: "fake_name",
        password: "fake_password",
        category: "fake_category",
        maxPlayers: 10,
        creatorId: "creator_id",
    }

    const sut = makeSut()

    expect(mockCreate(match)).toBeInstanceOf(ServerError)
  })

  it ("should throw for no name", async () => {
    const match = {
        id: "fake_id",
        password: "fake_password",
        category: "fake_category",
        maxPlayers: 10,
        creatorId: "creator_id",
    }

    const sut = makeSut()

    expect(mockCreate(match)).toBeInstanceOf(ServerError)
  })

  it ("should throw for no password", async () => {
    const match = {
        id: "fake_id",
        name: "fake_name",
        category: "fake_category",
        maxPlayers: 10,
        creatorId: "creator_id",
    }

    const sut = makeSut()

    expect(mockCreate(match)).toBeInstanceOf(ServerError)
  })

  it ("should throw for no category", async () => {
    const match = {
        id: "fake_id",
        name: "fake_name",
        password: "fake_password",
        maxPlayers: 10,
        creatorId: "creator_id",
    }

    const sut = makeSut()

    expect(mockCreate(match)).toBeInstanceOf(ServerError)
  })

  it ("should throw for no maxPlayers", async () => {
    const match = {
        id: "fake_id",
        name: "fake_name",
        password: "fake_password",
        category: "fake_category",
        creatorId: "creator_id",
    }

    const sut = makeSut()

    expect(mockCreate(match)).toBeInstanceOf(ServerError)
  })

  it ("should throw for no creatorId", async () => {
    const match = {
        id: "fake_id",
        name: "fake_name",
        password: "fake_password",
        category: "fake_category",
        maxPlayers: 10,
    }

    const sut = makeSut()

    expect(mockCreate(match)).toBeInstanceOf(ServerError)
  })

  it ("should return a match", async () => {
    const match = {
        id: "fake_id",
        name: "fake_name",
        password: "fake_password",
        category: "fake_category",
        maxPlayers: 10,
        creatorId: "creator_id",
    }

    mockCreate(match)

    expect(mockFindByCreatorId(match.creatorId)).toHaveProperty("id", match.id)
  })

  it ("should not return a match", async () => {
    const match = {
        id: "fake_id",
        name: "fake_name",
        password: "fake_password",
        category: "fake_category",
        maxPlayers: 10,
        creatorId: "creator_id",
    }

    expect(mockFindByCreatorId(match.creatorId)).toBe(null)
  })

  it ("should throw for no cretorId", async () => {
    const match = {
        id: "fake_id",
        name: "fake_name",
        password: "fake_password",
        category: "fake_category",
        maxPlayers: 10,
        creatorId: "creator_id",
    }

    expect(mockFindByCreatorId()).toBeInstanceOf(ServerError)
  })
})