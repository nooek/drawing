import Match from "../../../models/MatchModel";
import MatchI from "../../../interfaces/models/matchInterface";
import { ServerError } from "../../../utils/errors";

export default class MatchRepo {
  async create(matchData: MatchI) {
    try {
      const match = await Match.create({
        id: matchData.id,
        name: matchData.name,
        password: matchData.password,
        category: matchData.category,
        maxPlayers: matchData.maxPlayers,
        status: "created",
        creatorId: matchData.creatorId,
      })
      return match
    }catch(err) {
      return new ServerError(500)
    }
  }

  async findByCreatorId(creatorId: string) {
    try {
      const match = await Match.findOne({ where: { creaorId: creatorId } })

      if (!match) return null

      return match
    } catch(err) {
      return new ServerError(500)
    }
  }
}