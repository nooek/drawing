import { 
  Container,
  TitleContainer,
  Title,
  RightSideContainer,
  SectionsContainer,
  SectionsButtons,
  ProfileInfoContainer,
  ProfileInfoPfpContainer,
  ProfileInfoPfp,
  DropdownMenuContainer,
  DropdownMenu
} from "../../styles/navbar/desktopNavbarStyles";
import boy1Icon from "/images/avatars/boy_avatar1.png"

const DesktopNavbar = () => {
  return (
    <Container>
      <TitleContainer>
        <Title>Drawing War</Title>
      </TitleContainer>
      <RightSideContainer>
        <SectionsContainer>
          <SectionsButtons>Home</SectionsButtons>
          <SectionsButtons>Friends</SectionsButtons>
          <SectionsButtons>Profile</SectionsButtons>
        </SectionsContainer>
        <ProfileInfoContainer>
          <ProfileInfoPfpContainer>
            <ProfileInfoPfp src={"/images/avatars/boy_avatar1.png"} alt="sda" />
          </ProfileInfoPfpContainer>
        </ProfileInfoContainer>
        <DropdownMenuContainer>
          <DropdownMenu src="/images/dropdownButton.png" />
        </DropdownMenuContainer>
      </RightSideContainer>
      
    </Container>
  )
}

export default DesktopNavbar;
