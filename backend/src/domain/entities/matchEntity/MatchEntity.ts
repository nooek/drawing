import { MatchI } from "../../../interfaces2/Match/MatchI";
import { BaseResponseConstructor } from "../../../utils/errors/interfaces";

export interface MatchEntityI {
  create: (props: MatchI) => any;
}
export default class Match implements MatchEntityI {
  private InvalidParamError: BaseResponseConstructor;
  private MissingParamError: BaseResponseConstructor;
  private uuid: any;

  constructor(
    uuid: any,
    InvalidParamError: BaseResponseConstructor,
    MissingParamError: BaseResponseConstructor,
  ) {
    this.uuid = uuid;
    this.InvalidParamError = InvalidParamError;
    this.MissingParamError = MissingParamError;
  }

  public create(props: MatchI) {
    if (!props.category) {
      return new this.MissingParamError(400, {
        message: "Please provide the match category",
      });
    }

    if (!props.creatorId) {
      return new this.MissingParamError(400, {
        message: "Please provide the creator id",
      });
    }

    if (!props.maxPlayers) {
      return new this.MissingParamError(400, {
        message: "Please provide the number of players",
      });
    }

    if (props.maxPlayers < 2 || props.maxPlayers > 12) {
      return new this.InvalidParamError(400, {
        message: "The number of players must be between 2 and 20 characters",
      });
    }

    if (!props.name) {
      return new this.MissingParamError(400, {
        message: "Please provide the match name",
      });
    }

    if (props.name.length < 2 || props.name.length > 20) {
      return new this.InvalidParamError(400, {
        message: "The match name must have between 2 and 20 characters",
      });
    }

    if (props.password) {
      if (props.password.length > 18) {
        return new this.InvalidParamError(400, {
          message: "The match password must have less than 18 characters",
        });
      }
    }

    return {
      getId: () => (props.id ? props.id : this.uuid()),
      getName: () => props.name,
      getPassword: () => props.password,
      getCategory: () => props.category,
      getMaxPlayers: () => props.maxPlayers,
      getCreatorId: () => props.creatorId,
    };
  }
}
