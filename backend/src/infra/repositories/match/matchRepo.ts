import Match from "../../../models/MatchModel";
import { MatchI, MatchRepoI } from "../../../interfaces/models/matchInterface";
import { ServerError } from "../../../utils/errors";

export default class MatchRepo implements MatchRepoI {
  async create(matchData: MatchI): Promise<MatchI | ServerError> {
    try {
      const match = await Match.create({
        id: matchData.id,
        name: matchData.name,
        password: matchData.password ? matchData.password : null,
        category: matchData.category,
        maxPlayers: matchData.maxPlayers,
        status: matchData.status || "created",
        creatorId: matchData.creatorId,
      })
      return match
    }catch(err) {
      console.log(err)
      return new ServerError(500)
    }
  }

  async findByCreatorId(creatorId: string) {
    try {
      const match = await Match.findAll({ where: { creatorId: creatorId } })

      if (!match) return null

      return match
    } catch(err) {
      console.log(err)
      return new ServerError(500)
    }
  }

  async findMatchByStatusAndCreatorId(creatorId: string, status: string) {
    try {
      const match = await Match.findAll({ where: { creatorId: creatorId, status: status } })

      if (!match) return null

      return match
    } catch(err) {
      console.log(err)
      return new ServerError(500)
    }
  }
}