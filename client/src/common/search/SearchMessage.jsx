import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import LeftArrowImg from '../../assets/icons/left-arrow.png';
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
    width: ${props => (props.openSearch ? '420px' : '0px')};
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
  width: 420px;
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
  align-items: center;
  width: 100%;
  height: 60px;

  background: #212121;
  border: 1px solid #000000;
  border-right: none;
  border-top: none;
  border-bottom: none;
`;

const CloseAndInput = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  width: 100%;
  margin-left: 20px;
  margin-right: 20px;
`;

const LeftArowButton = styled.button`
  border-radius: 50%;
  border: none;
  width: 36px;
  height: 36px;
  background: none;

  &:hover {
    background: #383737;
    transition: 1s;
  }
`;

const LeftArowImage = styled.img`
  height: 20px;
`;

const SearchContent = styled.button`
  display: flex;
  align-items: center;
  border-radius: 20px;
  border: 2px solid #8774e1;

  background: #181818;
  height: 42px;
  width: 90%;
  margin-left: 5px;

  @media (max-width: 1202px) {
    height: 2.3rem;
    width: 88%;
    margin-right: 10px;
    height: 42px;
  }
`;

const ImageSearchContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 42px;
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
  height: 42px;
  width: 100%;
`;

const ChatMenuButton = styled.button`
  display: flex;
  align-items: center;
  width: 95%;
  height: 72px;

  background: none;
  border-radius: 18px;
  outline: none;
  border: none;
  margin-top: 2px;

  @media (max-width: 1202px) {
    width: 96%;
  }

  &:hover {
    background: #292929;
  }

  &:focus {
    background: #8774e1;
  }
`;

const ProfileAvatar = styled.img`
  width: 60px;
  height: 58px;

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

const SearchMessage = ({ close, openSearch, openChatMessage }) => {
  const [messages, setMessages] = useState([]);
  const [messageSearch, setMessageSearch] = useState('');
  const [filteredMessages, setfilteredMessages] = useState([]);

  const onChange = e => {
    setMessageSearch(e.target.value);
  };

  const chatImage = 'https://avatarfiles.alphacoders.com/715/71560.jpg';

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
            <LeftArowImage src={LeftArrowImg} />
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
        </CloseAndInput>
      </Header>
      <ContainerScroll>
        {messageSearch.length !== 0 && (
          <>
            {filteredMessages.map((item, index) => (
              <ProfileContent key={item.id + index.toString()}>
                <ChatMenuButton>
                  <ProfileAvatar src={chatImage} />
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
