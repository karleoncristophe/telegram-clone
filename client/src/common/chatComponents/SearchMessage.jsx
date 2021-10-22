import styled from 'styled-components';
import { useState, useEffect } from 'react';
import {
  SearchOutlined,
  CalendarOutlined,
  ArrowLeftOutlined,
} from '@ant-design/icons';
import UserImage from '../../assets/icons/user.png';

import api from '../../services/api';

const Container = styled.div`
  height: 100%;
  width: ${props => (props.openSearch ? '670px' : '0px')};
  transition: all ease 0.5s;
  overflow: hidden;
  display: flex;
  position: relative;
  background: #212121;
  flex-direction: column;

  @media (max-width: 1202px) {
    width: ${props => (props.openSearch ? '380px' : '0px')};
    position: absolute;
    right: 0;
    top: 0;
  }

  @media (max-width: 600px) {
    width: ${props => (props.openSearch ? '100%' : '0px')};
    display: ${props => (props.openChatMessage ? 'flex' : 'none')};
  }
`;

const ContainerScroll = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  overflow-x: hidden;

  @media (max-width: 600px) {
    width: 100%;
  }

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
  align-items: center;
  width: 100%;
`;

const Header = styled.header`
  display: flex;
  width: 100%;
  flex-direction: column;
  background: #212121;
  border: 1px solid #000000;
  border-right: none;
  border-top: none;
  border-bottom: none;
`;

const CloseAndInput = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 50px;
  width: 100%;
  margin-top: 5px;
`;

const LeftArowButton = styled.button`
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

const CalendarButton = styled.button`
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

const LeftArowImage = styled(ArrowLeftOutlined)`
  font-size: 1.25rem;
`;

const CalendarIcon = styled(CalendarOutlined)`
  font-size: 1.25rem;
`;

const SearchContent = styled.button`
  display: flex;
  align-items: center;
  border-radius: 30px;
  border: 2px solid #8774e1;
  background: #181818;
  height: 90%;
  width: 250px;

  @media (max-width: 600px) {
    width: 200px;
  }
`;

const ImageSearchContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 44px;
`;

const ImageSearch = styled(SearchOutlined)`
  display: flex;
  font-size: 20px;
  color: #8774e1;
`;

const SearchInput = styled.input`
  outline: none;
  background: none;
  border: none;
  font-size: 1rem;
  font-weight: 500;
  color: #ffff;
  height: 100%;
  width: 200px;

  @media (max-width: 600px) {
    width: 150px;
  }
`;

const ChatMenuButton = styled.button`
  display: flex;
  align-items: center;
  width: 96%;
  height: 72px;
  border-radius: 18px;
  outline: none;
  border: none;
  margin-top: 2px;
  background: none;

  &:hover {
    background: #292929;
  }

  &:focus {
    background: #8774e1;
  }
`;

const ProfileAvatar = styled.div`
  width: 58px;
  height: 58px;
  background-size: cover;
  background-image: url(${UserImage});
  border-radius: 50%;
`;

const ProfileInformation = styled.div`
  display: flex;
  text-align: left;
  flex-direction: column;
  margin-left: 10px;
  width: 80%;
`;

const NameViewAndHour = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Name = styled.span`
  font-size: 1.1rem;
  font-weight: 600;
  color: #ffff;
`;

// const ViewAndHour = styled.div`
//    display: flex;
//    align-items: center;
//    justify-content: space-between;
//    width: 50px;
// `;

// const Hour = styled.span`
//    font-size: 0.8rem;
//    font-weight: 550;
//    color: #6e6c6c;
// `;

const Message = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;
  white-space: nowrap;
  font-size: 1rem;
  font-weight: 550;
  color: #e9dada;
  width: 80%;
`;

const SubtitleContent = styled.div`
  display: flex;
  width: 170px;
  padding-left: 20px;
  margin-top: 20px;
`;

const Subtitle = styled.span`
  color: #bdbbbb;
  font-size: 1rem;
  width: 200px;
  font-weight: 600;
  text-align: left;
`;

const SearchMessage = ({ close, openSearch, openChatMessage }) => {
  const [messages, setMessages] = useState([]);
  const [messageSearch, setMessageSearch] = useState('');
  const [filteredMessages, setfilteredMessages] = useState([]);

  const onChange = e => {
    setMessageSearch(e.target.value);
  };

  useEffect(() => {
    setfilteredMessages(
      messages.filter(get => {
        return get.message
          .toLowerCase()
          .includes(messageSearch.toLocaleLowerCase());
        // get.user.toLowerCase().includes(messageSearch.toLocaleLowerCase())
      })
    );
  }, [messageSearch, messages]);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const { data } = await api.get('messages');
        setMessages(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRepos();
    // eslint-disable-next-line
  }, []);
  return (
    <Container openChatMessage={openChatMessage} openSearch={openSearch}>
      <Header>
        <CloseAndInput>
          <LeftArowButton onClick={close}>
            <LeftArowImage />
          </LeftArowButton>
          <SearchContent>
            <ImageSearchContent>
              <ImageSearch />
            </ImageSearchContent>
            <SearchInput
              autoFocus
              placeholder="Search"
              value={messageSearch}
              onChange={onChange}
            />
          </SearchContent>
          <CalendarButton onClick={close}>
            <CalendarIcon />
          </CalendarButton>
        </CloseAndInput>
        <SubtitleContent>
          <Subtitle>Search for messages</Subtitle>
        </SubtitleContent>
      </Header>
      <ContainerScroll>
        {messageSearch.length !== 0 && (
          <>
            {filteredMessages.map((item, index) => (
              <ProfileContent key={item.id + index.toString()}>
                <ChatMenuButton>
                  <ProfileAvatar />
                  <ProfileInformation>
                    <NameViewAndHour>
                      <Name>Teste</Name>
                    </NameViewAndHour>
                    <Message>{item.message}</Message>
                  </ProfileInformation>
                </ChatMenuButton>
              </ProfileContent>
            ))}
          </>
        )}
      </ContainerScroll>
    </Container>
  );
};

export default SearchMessage;
