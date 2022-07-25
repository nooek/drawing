import { prepareOptions } from "sequelize-typescript";
import MatchI from "../../../interfaces/models/matchInterface";

export default class Match {
  private InvalidParamError: any;
  private MissingParamError: any;
  private uuid: any;

  constructor(uuid: any, InvalidParamError: any, MissingParamError: any) {
    this.uuid = uuid;
    this.InvalidParamError = InvalidParamError;
    this.MissingParamError = MissingParamError;
  }

  public create(props: MatchI) {
    if (!props.category) {
      throw new this.MissingParamError({
        statusCode: 400,
        body: {
          message: "Please provide the match category",
          paramName: "category",
        },
      });
    }

    if (!props.creatorId) {
      throw new this.MissingParamError({
        statusCode: 400,
        body: {
          message: "Please provide the creator id",
          paramName: "creatorId",
        },
      });
    }

    if (!props.maxPlayers) {
      throw new this.MissingParamError({
        statusCode: 400,
        body: {
          message: "Please provide the number of players",
          paramName: "maxPlayers",
        },
      });
    }

    if (props.maxPlayers < 2 || props.maxPlayers > 12) {
      throw new this.InvalidParamError({
        statusCode: 400,
        body: {
          message: "The number of players must be between 2 and 20 characters",
        },
      });
    }

    if (!props.name) {
      throw new this.MissingParamError({
        statusCode: 400,
        body: {
          message: "Please provide the match name",
          paramName: "name",
        },
      });
    }

    if (props.name.length < 2 || props.name.length > 20) {
      throw new this.InvalidParamError({
        statusCode: 400,
        body: {
          message: "The match name must have between 2 and 20 characters",
        },
      });
    }

    if (props.password) {
      if (props.password.length > 18) {
        throw new this.InvalidParamError({
          statusCode: 400,
          body: {
            message: "The match password must have less than 18 characters",
          },
        });
      }
    }

    return {
      getId: () => props.id ? props.id : this.uuid(),
      getName: () => props.name,
      getPassword: () => props.password,
      getCategory: () => props.category,
      getMaxPlayers: () => props.maxPlayers,
      creatorId: () => props.creatorId
    }
  }
}
