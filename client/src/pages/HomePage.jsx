import styled from 'styled-components';
import { useState } from 'react';

import Menu from '../common/Menu';
import Chat from '../common/Chat';

const HomePageContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background: #181818;
`;

function HomePage() {
  const [openChatMessage, setOpenChatMessage] = useState(false);

  const openChat = () => {
    setOpenChatMessage(true);
  };

  const closeChat = () => {
    setOpenChatMessage(false);
  };

  return (
    <HomePageContainer>
      <Menu openChat={openChat} openChatMessage={openChatMessage} />
      <Chat
        closeChat={closeChat}
        openChat={openChat}
        openChatMessage={openChatMessage}
      />
    </HomePageContainer>
  );
}

export default HomePage;
