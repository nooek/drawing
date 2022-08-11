import { builtinModules } from "module";
import styled from "styled-components";

interface ContainerI {
  isActionActivated: boolean
}

export const Container = styled.div<ContainerI>`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: linear-gradient(
    180deg,
    rgba(232, 63, 111, 1) 0%,
    rgba(201, 54, 96, 1) 46%,
    rgba(172, 45, 82, 1) 65%,
    rgba(113, 29, 54, 1) 97%
  );
  backdrop-filter: ${props => props.isActionActivated ? "blur(1px)" : null};
  position: relative;
`;

export const GeneralContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  border: 1px solid yellow;
`;

// Put in separeted component

export const WelcomeContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin-top: 30px;
  border-bottom: 5px solid black;
  text-align: center;
`;

export const WelcomeText = styled.h2`
  font-size: 55px;
  color: #320d4f;
  margin-bottom: 30px;
  @media (max-width: 480px) {
    font-size: 12vw;
  }
  @media (max-width: 350px) {
    font-size: 45px;
  }
`;

export const WelcomePfp = styled.img`
  height: 280px;
  margin-bottom: 10px;
  @media (max-width: 480px) {
    height: 200px;
  }
`;
// -----------------------------------

// Put in a separeted component

export const ActionsContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

export const ActionContainer = styled.div`
  width: 100%;
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-bottom: 5px solid black;
  text-align: center;
`;

export const ActionTitle = styled.h2`
  font-size: 46px;
  color: #320d4f;
  margin-bottom: 60px;
  @media (max-width: 480px) {
    margin-bottom: 30px;
    font-size: 10vw;
  }
  @media (max-width: 350px) {
    margin-bottom: 30px;
    font-size: 28px;
  }
 
`;

export const ActionButton = styled.button`
  width: 300px;
  height: 80px;
  background-color: black;
  color: white;
  border-radius: 5px;
  border: 3px solid white;
  font-size: 23px;
  @media(max-width: 300px){
    width: 95%;
    height: 60px;
    font-size: 18px;
  }
`
// -----------------------------------