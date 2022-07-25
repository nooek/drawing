import MatchReturnI from "../../../interfaces/domain/entities/matchEntity";
import MatchI from "../../../interfaces/models/matchInterface";

export const mockCreate = jest.fn((props: MatchI): MatchReturnI => {
  if (!props.category) throw new Error()
  if (!props.creatorId) throw new Error()

  if (!props.maxPlayers) throw new Error()
  if (props.maxPlayers < 2 || props.maxPlayers > 12) throw new Error()

  if (!props.name) throw new Error()
  if (props.name.length < 2 || props.name.length > 20) throw new Error()

  if (props.password) {
    if (props.password.length > 18) throw new Error()
  }

  return {
    getId: () => (props.id ? props.id : "fake_id"),
    getName: () => props.name,
    getPassword: () => props.password,
    getCategory: () => props.category,
    getMaxPlayers: () => props.maxPlayers,
    getCreatorId: () => props.creatorId,
  };
});

const mock = jest.fn().mockImplementation(() => {
  return {
    create: mockCreate,
  }
})

export default mock
