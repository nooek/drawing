import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AllowNull,
  Length,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import MatchI from "../interfaces/models/matchInterface";
import User from "./UserModel";

@Table
class Match extends Model implements MatchI {
  @PrimaryKey
  @AllowNull(false)
  @Column({ type: DataType.STRING })
  id!: string;

  @AllowNull(false)
  @Column({ type: DataType.STRING })
  category!: string;

  @Length({ min: 2, max: 20 })
  @AllowNull(false)
  @Column({ type: DataType.STRING })
  name!: string;

  @AllowNull(true)
  @Column({ type: DataType.STRING })
  password!: string;

  @AllowNull(false)
  @Column({ type: DataType.INTEGER })
  maxPlayers!: number;

  @AllowNull(false)
  @Column({ type: DataType.STRING })
  status!: string; 

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column({ type: DataType.STRING })
  creatorId!: string;

  @BelongsTo(() => User)
  user!: User;
}

export default Match
