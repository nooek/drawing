import HashPasswordInterface from "../../../../interfaces/helpers/hashPasswordInterface";
import { CreateMatchUsecaseI, MatchEntityI, MatchI, MatchRepoI } from "../../../../interfaces2/Match/MatchI";
import { BaseResponseConstructor } from "../../../../utils/errors/interfaces";

export default class CreateMatchUsecase implements CreateMatchUsecaseI {
  private matchEntity: MatchEntityI;
  private matchDb: MatchRepoI;
  public uuid;
  private hashPassword: HashPasswordInterface;
  private UnauthorizedError: BaseResponseConstructor;

  constructor(
    matchEntity: MatchEntityI,
    matchDb: any,
    uuid: Function,
    hashPassword: HashPasswordInterface,
    UnauthorizedError: BaseResponseConstructor
  ) {
    this.matchEntity = matchEntity;
    this.matchDb = matchDb;
    this.uuid = uuid;
    this.hashPassword = hashPassword;
    this.UnauthorizedError = UnauthorizedError
  }

  async execute(matchData: MatchI) {
    const matchEntity = await this.matchEntity.create({
      id: this.uuid(),
      name: matchData.name,
      password: matchData.password,
      category: matchData.category,
      maxPlayers: matchData.maxPlayers,
      creatorId: matchData.creatorId,
    });
    if (matchEntity instanceof Error) return matchEntity;

    const someMatchInProgress = await this.matchDb.findMatchByStatusAndCreatorId(matchEntity.getCreatorId(), "in-progress")
    console.log(someMatchInProgress)
    if (someMatchInProgress) {
      return new this.UnauthorizedError(400,
        {
          message: "You already have a match in progress, please wait for it to end",

        });
    }

    const hashedPassword = await this.hashPassword.hash(matchEntity.getPassword());

    const createdMatch = await this.matchDb.create({
      id: matchEntity.getId(),
      name: matchEntity.getName(),
      password: hashedPassword,
      category: matchEntity.getCategory(),
      maxPlayers: matchEntity.getMaxPlayers(),
      creatorId: matchEntity.getCreatorId()
    })
    if (createdMatch instanceof Error) return createdMatch

    return {
      statusCode: 200,
      body: {
        id: matchEntity.getId(),
        name: matchEntity.getName(),
        category: matchEntity.getCategory(),
        maxPlayers: matchEntity.getMaxPlayers(),
      },
    }
  }
}
