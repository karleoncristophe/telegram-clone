import styled from 'styled-components';
import Cards from '../chatComponents/Cards';
import { CloseOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

import ImgArroba from '../../assets/icons/arroba.png';
import PersonUser from '../../assets/icons/personUser.png';

const Container = styled.div`
  height: 100%;
  width: ${props => (props.openProfileInformation ? '670px' : '0px')};
  transition: all ease 0.2s;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background: #212121;

  @media (max-width: 1202px) {
    width: ${props => (props.openProfileInformation ? '424px' : '0px')};
    position: absolute;
    right: 0;
    top: 0;
  }

  @media (max-width: 600px) {
    width: ${props => (props.openProfileInformation ? '100%' : '0px')};
  }
`;

const ContainerScroll = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  background: #212121;

  overflow-y: scroll;
  overflow-x: hidden;

  ::-webkit-scrollbar {
    width: 7px;
  }

  ::-webkit-scrollbar-track {
    background: transparent; /* color of the tracking area */
  }

  ::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 20px;
  }
`;

const ProfileContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Header = styled.header`
  display: flex;

  align-items: center;
  width: 100%;
  height: 60px;
  background: #212121;
  border: 1px solid #000000;
  border-right: none;
  border-top: none;
  border-bottom: none;
`;

const CloseAndTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  width: 120px;
  margin-left: 10px;
  margin-right: 20px;
`;
const Close = styled.button`
  border-radius: 50%;
  border: none;
  width: 40px;
  height: 40px;
  color: #8a8787;
  background: none;
  &:hover {
    background: #383737;
    transition: 1s;
  }
`;
const CloseImage = styled(CloseOutlined)`
  font-size: 1.25rem;
`;
const Title = styled.span`
  font-size: 1.4rem;
  font-weight: 600;
  color: #ffff;
  letter-spacing: 1px;
`;

const PersonAvatarContent = styled.main`
  width: 100%;
`;
const PersonInformation = styled.div`
  height: 420px;
  width: 100%;
  background: url(${PersonUser});
  background-size: cover;
  background-position: center;
`;
const PersonNameAndBioButon = styled.button`
  display: flex;
  align-items: center;
  min-height: 64px;
  max-height: 150px;
  width: 100%;
  border: none;
  background: none;
  padding: 10px;
  overflow: hidden;

  &:hover {
    background: #383737;
    transition: 1s;
  }
`;
const PersonInformationArroba = styled.img`
  height: 22px;
  color: #707579;
`;

const PersonInformationExclamation = styled(ExclamationCircleOutlined)`
  font-size: 1.37rem;
  color: #707579;
`;
const PersonNameAndBioContent = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  text-overflow: ellipsis;
  word-wrap: break-word;
  margin-left: 20px;
`;

const PersonNameAndBio = styled.span`
  color: #707579;
  font-size: 1.2rem;

  line-height: 20px;
`;

const Space = styled.div`
  width: 100%;
  height: 10px;
  background: #181818;
`;

const PersonProfile = ({
  closeProfile,
  openProfileInformation,
  openChatMessage,
  data,
}) => {
  return (
    <Container
      openChatMessage={openChatMessage}
      openProfileInformation={openProfileInformation}
    >
      <Header>
        <CloseAndTitle>
          <Close onClick={closeProfile}>
            <CloseImage />
          </Close>
          <Title>Profile</Title>
        </CloseAndTitle>
      </Header>
      <ContainerScroll>
        <ProfileContent openChatMessage={openChatMessage}>
          <PersonAvatarContent>
            <PersonInformation></PersonInformation>
            <PersonNameAndBioButon>
              <PersonInformationArroba src={ImgArroba} />
              <PersonNameAndBioContent>
                <PersonNameAndBio>{data?.username}</PersonNameAndBio>
              </PersonNameAndBioContent>
            </PersonNameAndBioButon>
            <PersonNameAndBioButon>
              <PersonInformationExclamation />
              <PersonNameAndBioContent>
                <PersonNameAndBio>
                  {data?.bio === undefined ? 'No biography.' : `${data?.bio}`}
                </PersonNameAndBio>
              </PersonNameAndBioContent>
            </PersonNameAndBioButon>
          </PersonAvatarContent>
          <Space />
          <Cards />
        </ProfileContent>
      </ContainerScroll>
    </Container>
  );
};

export default PersonProfile;
