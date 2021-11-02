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

const ChatIntro = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  border: 1px solid #000000;
  border-top: none;
  width: 65%;
  position: relative;
  background: #0e0d0d;
  background-size: cover;

  @media (max-width: 911px) {
    display: none;
  }
`;

function HomePage() {
  const [users, setUsers] = useState([]);
  const [activeChat, setActiveChat] = useState(users.map(get => get._id));
  // eslint-disable-next-line
  const [state, setState] = useState({});
  console.log(activeChat);

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
        openChat={activeChat?._id}
        setActiveChat={setActiveChat}
        openChatMessage={activeChat?._id}
        activeChat={activeChat}
        users={users}
      />
      <>
        {activeChat?._id !== undefined && (
          <Chat
            active={activeChat?._id}
            user={activeChat?._id}
            userName={activeChat?.name}
            userBio={activeChat?.bio}
            closeChat={() => setActiveChat(false)}
            openChatMessage={() => setActiveChat(true)}
          />
        )}
        {activeChat?._id === undefined && <ChatIntro activeChat={activeChat} />}
      </>
    </HomePageContainer>
  );
}

export default HomePage;
