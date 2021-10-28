import styled from 'styled-components';
import { useState, useEffect } from 'react';
import Menu from '../common/Menu';
import Chat from '../common/Chat';
import api from '../services/api';

const HomePageContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background: #181818;
`;

function HomePage() {
  const [openChatMessage, setOpenChatMessage] = useState(false);
  const [users, setUsers] = useState([]);
  // eslint-disable-next-line
  const [state, setState] = useState({});

  const openChat = () => {
    setOpenChatMessage(true);
  };

  const closeChat = () => {
    setOpenChatMessage(false);
  };

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const { data } = await api.get('users');
        setUsers(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRepos();
    return () => {
      setState({}); // update an unmounted component
    };
    // eslint-disable-next-line
  }, []);

  return (
    <HomePageContainer>
      <Menu
        openChat={openChat}
        openChatMessage={openChatMessage}
        users={users}
      />

      <Chat
        users={users}
        closeChat={closeChat}
        openChat={openChat}
        openChatMessage={openChatMessage}
      />
    </HomePageContainer>
  );
}

export default HomePage;
