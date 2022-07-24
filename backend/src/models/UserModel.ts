import { Table, Column, Model, PrimaryKey, AllowNull, Length, DataType, HasMany } from "sequelize-typescript"
import UserAttributes from "../types/UserType";
import Match from "./MatchModel";

@Table
class User extends Model<UserAttributes> {
  @PrimaryKey
  @AllowNull(false)
  @Column({type: DataType.STRING})
  id!: string;

  @Length({ min: 2, max: 35 })
  @AllowNull(false)
  @Column({type: DataType.STRING})
  name!: string;

  @Length({ max: 50 })
  @AllowNull(false)
  @Column({type: DataType.STRING})
  email!: string;

  @AllowNull(false)
  @Column({type: DataType.STRING})
  password!: string;

  @HasMany(() => Match)
  matchs!: Match[]
}

export default User
