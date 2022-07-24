import styled from "styled-components"

export const Container = styled.div`
  width: 100%;
  height: 90px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom: 2px solid black;
  position: sticky;
  top: 0;
  font-family: 'Roboto', sans-serif;
`

export const TitleContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  text-align: center;
  margin-left: 20px;
  @media(max-width: 430px) {
    margin-left: 10px;
  }
`

export const Title = styled.h2`
  color: #320d4f;
  font-size: 35px;
  font-family: 'Noto-Sans', sans-serif;
  @media(max-width: 430px) {
    font-size: 30px;
  }
`

export const RightSideContainer = styled.div`
  width: auto;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

export const SectionsContainer = styled.div`
  width: auto;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  @media(max-width: 660px) {
    display: none;
  }
`

export const SectionsButtons = styled.button`
  width: 180px;
  height: 60px;
  font-size: 18px;
  color: white;
  font-family: 'Roboto', sans-serif;
  background: black;
  border: 2px solid white;
  margin-left: 10px;
  @media(max-width: 1100px) {
    width: 120px;
  }
`

export const ProfileInfoContainer = styled.div`
  width: auto;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-left: 10px;
`

export const ProfileInfoPfpContainer = styled.div`
  width: 85px;
  height: 85px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  margin-left: 10px;
  @media(max-width: 350px) {
    display: none;
  }
`

export const ProfileInfoPfp = styled.img`
  height: 100%;
  width: 100%;
`

export const DropdownMenuContainer = styled.div`
  width: 50px;
  height: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-left: 10px;
  margin-right: 10px;
  @media(min-width: 660px) {
    display: none;
  }
`

export const DropdownMenu = styled.img`
  height: 100%;
  width: 100%;
`

// export const ProfileInfoUsername = styled.h2`
//   color: #320d4f;
//   font-size: 30px;
//   font-family: 'Noto-Sans', sans-serif;
// `

