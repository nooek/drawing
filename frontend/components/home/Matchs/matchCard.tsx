import {
  MatchCardContainer,
  MatchCardNameContainer,
  MatchCardName,
  MatchCardInfoContainer,
  MatchCardInfo,
  MatchCardButtonsContainer,
  MatchCardButton
} from "./styles";
import { MatchI } from "../../../store/matchs/action";

type Props = {
  match: MatchI
}

const MatchCard = ({ match }: Props) => {
  return (
    <MatchCardContainer>
      <MatchCardNameContainer>
        <MatchCardName>{match.name}</MatchCardName>
      </MatchCardNameContainer>
      <MatchCardInfoContainer>
        <MatchCardInfo>Category: {match.category}</MatchCardInfo>
        <MatchCardInfo>Max Players: {match.maxPlayers}</MatchCardInfo>
        <MatchCardInfo isId={true}>Match Id: {match.id}</MatchCardInfo>
      </MatchCardInfoContainer>
      <MatchCardButtonsContainer>
        <MatchCardButton isStart={true}>Start</MatchCardButton>
        <MatchCardButton>Cancel</MatchCardButton>
      </MatchCardButtonsContainer>
    </MatchCardContainer>
  );
};

export default MatchCard
