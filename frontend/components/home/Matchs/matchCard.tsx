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
  match: MatchI;
}

const MatchCard = ({ match }: Props) => {

  const startMatch = () => {
    console.log(match.id)
  }

  const cancelMatch = () => {
    console.log(match.id)
  }

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
        <MatchCardButton isStart={true} onClick={() => startMatch()}>Start</MatchCardButton>
        <MatchCardButton onClick={() => cancelMatch()}>Cancel</MatchCardButton>
      </MatchCardButtonsContainer>
    </MatchCardContainer>
  );
};

export default MatchCard
