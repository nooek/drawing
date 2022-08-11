import { GetServerSideProps } from "next";
import { useSelector } from "react-redux";
import { api } from "../../../services/api";
import {
  Container, 
  MatchCard,
  MatchCardName,
  MatchCardNameContainer,
  MatchsContainer,
  MatchTitle,
  MatchCardInfoContainer,
  MatchCardInfo,
  MatchCardButtonsContainer,
  MatchCardButton
} from "./styles";
import { MatchI } from "../../../store/matchs/action";

const Matchs = () => {
  const matchs = useSelector((state: any) => state.matchs.matchs)
  if (matchs.length) {
    return (
      <Container>
        <MatchTitle>Your matchs</MatchTitle>
        <MatchsContainer>
            {
            matchs.map((match: MatchI) => {
                return (
                  <MatchCard>
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
                  </MatchCard>
                )
            })
            }
        </MatchsContainer>
      </Container>
    )
  } else {
    return null
  }
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {}
  }
}

export default Matchs
