import MatchI from "../../../../interfaces/models/matchInterface";
import HashPasswordInterface from "../../../../interfaces/helpers/hashPasswordInterface";
import { match } from "assert";

export default class CreateMatchUsecase {
  private matchEntity;
  private matchDb;
  public uuid;
  private hashPassword: HashPasswordInterface;

  constructor(
    matchEntity: any,
    matchDb: any,
    uuid: Function,
    hashPassword: HashPasswordInterface,
  ) {
    this.matchEntity = matchEntity;
    this.matchDb = matchDb;
    this.uuid = uuid;
    this.hashPassword = hashPassword;
  }

  async execute(matchData: MatchI) {
    const matchEntity = await this.matchEntity.create({
      id: this.uuid(),
      name: matchData.name,
      password: matchData.password || null,
      category: matchData.category,
      maxPlayers: matchData.maxPlayers,
      creatorId: matchData.creatorId,
    });
    if (matchEntity instanceof Error) return matchEntity;

    const hashedPassword = await this.hashPassword.hash(matchEntity.getPassword());

    const createdMatch = await this.matchDb.create({
      id: matchEntity.getId(),
      name: matchEntity.getName(),
      password: hashedPassword || null,
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
      }
    }
  }
}
