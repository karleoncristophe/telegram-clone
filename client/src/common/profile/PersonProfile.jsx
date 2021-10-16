import { useState } from 'react';
import styled from 'styled-components';
// import { Modal, Button } from 'antd';
import ImgClose from '../../assets/icons/close.png';
import ImgArroba from '../../assets/icons/arroba.png';
import ImgInformation from '../../assets/icons/information.png';
import PersonUser from '../../assets/icons/personUser.png';

const Container = styled.div`
  height: 100%;
  width: 420px;
  transition: all ease 0.5s;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background: #212121;

  @media (max-width: 1202px) {
    position: absolute;
    right: 0;
    top: 0;
  }

  @media (max-width: 600px) {
    width: 100%;
    display: ${props => (props.openChatMessage ? 'flex' : 'none')};
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
  width: 423px;
  @media (max-width: 600px) {
    width: ${props => (props.openChatMessage ? '100%' : '423px')};
  }
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
  margin-left: 20px;
  margin-right: 20px;
`;
const Close = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: none;
  border-radius: 50%;
  width: 37px;
  height: 37px;

  &:hover {
    background: #383737;
    transition: 1s;
  }
`;
const CloseImage = styled.img`
  height: 22px;
`;
const Title = styled.span`
  font-size: 1.4rem;
  font-weight: 600;
  color: #ffff;
  letter-spacing: 1px;
`;

const PersonAvatarContent = styled.main`
  /* height: 560px; */
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
const PersonInformationImage = styled.img`
  height: 22px;
`;
const PersonNameAndBioContent = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-left: 20px;
`;

const PersonNameAndBio = styled.span`
  color: #707579;
  font-size: 1.2rem;
  word-wrap: break-word;
  line-height: 20px;
`;

const PersonDataContent = styled.footer`
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
  /* background: #00eeff; */
`;
const PersonDataHead = styled.div`
  width: 100%;
  height: 56px;
`;
const PersonDataButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 100%;
  width: 100%;
  border: none;

  background: none;
`;
const PersonDataTitle = styled.span`
  color: #6a52da;
  font-size: 1rem;
  font-weight: 600;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background: #383737;
  }
`;

const PersonDataImageContent = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
`;

// const PersonDataImage = styled.img`
//   width: 139.33px;
//   height: 139.33px;
//   background: #6a52da;
// `;

// const PersonDataImageModal = styled.img`
//   width: 600px;
//   height: 600px;
//   background: #6a52da;
// `;

const Space = styled.div`
  width: 100%;
  height: 15px;
  background: #181818;
`;

// const ButtonModal = styled(Button)`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   width: 139.33px;
//   height: 139.33px;
// `;

const MediaContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 139.33px;
  height: 139.33px;
  border: none;
  background: none;
`;

const Card = styled.div`
  background: red;
  width: 100%;
  height: 100%;

  :hover {
    background: #721a1a;
  }
`;

const PersonProfile = ({
  closeProfile,
  openProfileInformation,
  openChatMessage,
}) => {
  // const [visible, setVisible] = useState(false);
  const [media, setMedia] = useState(true);
  const [files, setFiles] = useState(false);
  const [links, setLinks] = useState(false);
  const [voice, setVoice] = useState(false);

  const openMedia = () => {
    setMedia(prev => !prev);
  };
  const openFiles = () => {
    setFiles(prev => !prev);
  };

  const openLinks = () => {
    setLinks(prev => !prev);
  };

  const openVoice = () => {
    setVoice(prev => !prev);
  };
  return (
    <Container
      openChatMessage={openChatMessage}
      style={{ width: openProfileInformation ? '420px' : '0px' }}
    >
      <Header>
        <CloseAndTitle>
          <Close onClick={closeProfile}>
            <CloseImage src={ImgClose} />
          </Close>
          <Title>Profile</Title>
        </CloseAndTitle>
      </Header>
      <ContainerScroll>
        <ProfileContent openChatMessage={openChatMessage}>
          <PersonAvatarContent>
            <PersonInformation></PersonInformation>
            <PersonNameAndBioButon>
              <PersonInformationImage src={ImgArroba} />
              <PersonNameAndBioContent>
                <PersonNameAndBio>José</PersonNameAndBio>
              </PersonNameAndBioContent>
            </PersonNameAndBioButon>
            <PersonNameAndBioButon>
              <PersonInformationImage src={ImgInformation} />
              <PersonNameAndBioContent>
                <PersonNameAndBio>
                  Be the change you wish to see in the world.
                </PersonNameAndBio>
              </PersonNameAndBioContent>
            </PersonNameAndBioButon>
          </PersonAvatarContent>
          <Space />
          <PersonDataContent>
            <PersonDataHead>
              <PersonDataButton>
                <PersonDataTitle onClick={openMedia}>Media</PersonDataTitle>

                <PersonDataTitle onClick={openFiles}>Files</PersonDataTitle>

                <PersonDataTitle onClick={openLinks}>Links</PersonDataTitle>

                <PersonDataTitle onClick={openVoice}>Voice</PersonDataTitle>
              </PersonDataButton>
            </PersonDataHead>

            <PersonDataImageContent>
              {media ? (
                <MediaContent>
                  <Card>Media</Card>
                </MediaContent>
              ) : (
                ''
              )}
              {files ? (
                <MediaContent>
                  <Card>Files</Card>
                </MediaContent>
              ) : (
                ''
              )}
              {links ? (
                <MediaContent>
                  <Card>Links</Card>
                </MediaContent>
              ) : (
                ''
              )}
              {voice ? (
                <MediaContent>
                  <Card>Voice</Card>
                </MediaContent>
              ) : (
                ''
              )}
              {/* <ButtonModal type="primary" onClick={() => setVisible(true)}>
                <PersonDataImage
                  src={
                    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSy419PY8pgjFNv6vvOiNHrTz0WIWDH8v0Tsi04IsjGlcVU7uTOMJzuqT8DB6ufVDGUNl4&usqp=CAU'
                  }
                />
              </ButtonModal>

              <Modal
                visible={visible}
                onOk={() => setVisible(false)}
                onCancel={() => setVisible(false)}
                width={800}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <PersonDataImageModal
                  src={
                    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSy419PY8pgjFNv6vvOiNHrTz0WIWDH8v0Tsi04IsjGlcVU7uTOMJzuqT8DB6ufVDGUNl4&usqp=CAU'
                  }
                />
              </Modal> */}
            </PersonDataImageContent>
          </PersonDataContent>
        </ProfileContent>
      </ContainerScroll>
    </Container>
  );
};

export default PersonProfile;
