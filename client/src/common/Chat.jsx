import styled from 'styled-components';
import { useState } from 'react';

import PersonProfile from './chatComponents/PersonProfile';
import SearchMessage from './chatComponents/SearchMessage';
import ViewMessages from '../common/chatComponents/messages/ViewMessages';
import Header from './chatComponents/Header';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  border: 1px solid #000000;
  border-top: none;
  width: 65%;
  position: relative;
  background: #0e0d0d;

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

const Chat = ({ userBio, openChatMessage, closeChat, user, data }) => {
  const [openProfileInformation, setOpenProfileInformation] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);

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

  return (
    <Container openChatMessage={openChatMessage}>
      <ChatBackground>
        <ChatContent
          openSearch={openSearch}
          openProfileInformation={openProfileInformation}
        >
          <Header
            data={data}
            closeChat={closeChat}
            openSearch={openSearch}
            openProfile={openProfile}
            openMessageFinder={openMessageFinder}
            openProfileInformation={openProfileInformation}
          />
          <ViewMessages
            users={user}
            dataInformatios={data}
            openSearch={openSearch}
            openProfile={openProfile}
            openProfileInformation={openProfileInformation}
          />
        </ChatContent>
        <>
          <PersonProfile
            data={data}
            closeProfile={closeProfile}
            openChatMessage={openChatMessage}
            openProfileInformation={openProfileInformation}
          />

          <SearchMessage
            openSearch={openSearch}
            close={closeMessageFinder}
            openChatMessage={openChatMessage}
          />
        </>
      </ChatBackground>
    </Container>
  );
};

export default Chat;
