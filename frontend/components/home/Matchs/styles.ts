import styled from "styled-components"

export const Container = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  text-align: center;
  border-bottom: 2px solid yellow;
`

export const MatchsContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`

export const MatchTitle = styled.h2`
  font-size: 50px;
  color: #320d4f;
  margin-bottom: 60px;
  margin-top: 60px;
  @media (max-width: 480px) {
    margin-bottom: 30px;
    font-size: 10vw;
  }
  @media (max-width: 350px) {
    margin-bottom: 30px;
    font-size: 28px;
  }
`;

export const MatchCardContainer = styled.div`
  width: 350px;
  height: 450px;
  display: flex;
  flex-direction: column;
  border: 4.5px solid rgb(87, 9, 117);
  border-radius: 8px;
  box-shadow: 6px 6px 5px black;
  background: linear-gradient(180deg, rgba(244,3,255,1) 0%, rgba(144,12,150,1) 100%);
`

export const MatchCardNameContainer = styled.div`
  width: 100%;
  height: 90px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid black;
`

export const MatchCardName = styled.h2`
  font-family: 'Roboto', sans-serif;
  color: black;
  font-size: 35px;
`

export const MatchCardInfoContainer = styled.div`
  width: 100%;
  height: 280px;
  display: flex;
  flex-direction: column;
  align-items: left;
  text-align: left;
  justify-content: space-around;
  border-bottom: 0.5px solid black;
`

interface MatchCardInfoI {
  isId?: boolean;
}

export const MatchCardInfo = styled.h2<MatchCardInfoI>`
  font-family: 'noto-sans', sans-serif;
  color: black;
  margin-left: 20px;
  font-size: ${props => props.isId ? "23px" : "28px"};
`

export const MatchCardButtonsContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
`

interface MatchCardButtonI {
  isStart?: boolean;
}

export const MatchCardButton = styled.button<MatchCardButtonI>`
  width: 50%;
  height: 100%;
  font-size: 28px;
  color: black;
  font-family: "noto-sans", sans-serif;
  background: ${(props) => props.isStart ? "linear-gradient(90deg, rgba(0,255,90,1) 0%, rgba(8,195,73,1) 51%, rgba(8,170,65,1) 100%);"
    : "linear-gradient(90deg, rgba(255,0,21,1) 0%, rgba(170,5,14,1) 100%)" }
`
