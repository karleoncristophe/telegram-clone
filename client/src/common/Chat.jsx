import { useState } from 'react';
import { useLocation } from 'react-router';
import { Menu, Dropdown } from 'antd';
import styled from 'styled-components';
import TrashImg from '../assets/icons/trash.svg';
import PersonProfile from './chatComponents/PersonProfile';
import SearchMessage from './chatComponents/SearchMessage';
import {
  SearchOutlined,
  MoreOutlined,
  ArrowLeftOutlined,
} from '@ant-design/icons';
import ViewMessages from './chatComponents/ViewMessages';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  border: 1px solid #000000;
  border-top: none;
  width: 65%;
  position: relative;
  background: #0e0d0d;

  @media (max-width: 1202px) {
    width: 571.2px;
  }

  @media (max-width: 911px) {
    width: 100%;
    border: none;
    display: ${props => (props.openChatMessage ? 'flex' : 'none')};
  }
`;

const ChatContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;

const ChatBackground = styled.div`
  display: flex;
  align-items: center;
  background: #0e0d0d;
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 100%;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  background: #212121;
  height: 56px;
  width: 100%;
  padding: 5px;
`;

const ProfileContent = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const ProfileContentButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  width: 58px;
  height: 48px;
  border: none;
  background: none;
`;

const ProfileAvatar = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
`;

const ProfileInformationContent = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 15px;
`;

const ProfileName = styled.span`
  font-size: 1.1rem;
  font-weight: 600;
  color: #ffff;

  @media (max-width: 952px) {
    font-size: 1rem;
  }
`;

const ProfileView = styled.span`
  font-size: 0.9rem;
  font-weight: 500;
  color: #6e6c6c;

  @media (max-width: 952px) {
    font-size: 0.8rem;
  }
`;

const SearchAndMenuContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  justify-content: space-evenly;
  height: 49px;
  width: 100px;
`;

const ImageSearch = styled(SearchOutlined)`
  display: flex;
  font-size: 24px;
  color: #8a8787;
`;

const ImageMenu = styled(MoreOutlined)`
  display: flex;
  font-size: 24px;
  color: #8a8787;
`;

const MoreOptions = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  border-radius: 50%;
  height: 38px;
  width: 38px;

  &:hover {
    background: #383737;
  }
`;

const SearchMessageButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  border-radius: 50%;
  height: 38px;
  width: 38px;

  &:hover {
    background: #383737;
  }
`;

const DeleteChatContent = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-around;
  background: none;
  border: none;
  width: 100%;
  height: 40px;

  &:hover {
    background: #383737;
    transition: 1s;
  }
`;

const DeleteChat = styled.span`
  color: #ec5b5b;
  font-weight: 540;
  font-size: 1.1rem;
`;

const Trash = styled.img`
  height: 50%;
`;

const MenuOptions = styled(Menu)`
  background: #212121;
  height: 60px;
  width: 150px;
  display: flex;
  align-items: center;
  /* padding: 0px 10px 0px 10px; */
  margin-top: 10px;
  right: 7px;
  border-radius: 4px;
`;

const LeftArowButton = styled.button`
  border-radius: 50%;
  border: none;
  width: 40px;
  height: 40px;
  color: #8a8787;
  background: none;
  margin-left: 5px;
  &:hover {
    background: #383737;
    transition: 1s;
  }

  @media (min-width: 912px) {
    display: none;
  }
`;

const LeftArowImage = styled(ArrowLeftOutlined)`
  font-size: 1.25rem;
`;

const Chat = ({ openChatMessage, closeChat }) => {
  const [openProfileInformation, setOpenProfileInformation] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);

  const location = useLocation();
  const nick = location.state.user;

  const deleteChat = (
    <MenuOptions>
      <DeleteChatContent>
        <Trash src={TrashImg} />
        <DeleteChat>Delete Chat</DeleteChat>
      </DeleteChatContent>
    </MenuOptions>
  );

  const openProfile = () => {
    setOpenProfileInformation(true);
  };

  const closeProfile = () => {
    setOpenProfileInformation(false);
  };

  const openMessageFinder = () => {
    setOpenSearch(true);
  };

  const closeMessageFinder = () => {
    setOpenSearch(false);
  };

  const ChatImage =
    'https://t3.ftcdn.net/jpg/03/02/41/08/240_F_302410851_oPS6nnVa0e2bexWL9vVR85kcha5uLkuz.jpg';

  return (
    <Container openChatMessage={openChatMessage}>
      {openChatMessage ? (
        <ChatBackground>
          <ChatContent
            openProfileInformation={openProfileInformation}
            openSearch={openSearch}
          >
            <Header>
              <ProfileContent>
                <LeftArowButton onClick={closeChat}>
                  <LeftArowImage />
                </LeftArowButton>
                <ProfileContentButton
                  onClick={openProfile}
                  disabled={openSearch === true}
                >
                  <ProfileAvatar src={ChatImage} />
                </ProfileContentButton>
                <ProfileInformationContent>
                  <ProfileName>Chat</ProfileName>
                  <ProfileView>last seen recently</ProfileView>
                </ProfileInformationContent>
              </ProfileContent>
              <SearchAndMenuContent>
                <SearchMessageButton
                  onClick={openMessageFinder}
                  disabled={openProfileInformation === true}
                >
                  <ImageSearch />
                </SearchMessageButton>
                <Dropdown
                  overlay={deleteChat}
                  placement="bottomRight"
                  overlayStyle={{ background: 'none' }}
                >
                  <MoreOptions>
                    <ImageMenu />
                  </MoreOptions>
                </Dropdown>
              </SearchAndMenuContent>
            </Header>

            <ViewMessages openProfile={openProfile} />
          </ChatContent>
          <>
            <PersonProfile
              closeProfile={closeProfile}
              openProfileInformation={openProfileInformation}
              nick={nick}
              openChatMessage={openChatMessage}
            />

            <SearchMessage
              openSearch={openSearch}
              close={closeMessageFinder}
              openChatMessage={openChatMessage}
            />
          </>
        </ChatBackground>
      ) : null}
    </Container>
  );
};

export default Chat;
