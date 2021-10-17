import { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import { Menu, Dropdown } from 'antd';
import io from 'socket.io-client';
import styled from 'styled-components';
import Picker from 'emoji-picker-react';
import TrashImg from '../assets/icons/trash.svg';
import ImgEmoji from '../assets/icons/emoji.png';
import ImgAirplane from '../assets/icons/sendmessage.png';
import Messages from '../common/Messages';
import PersonProfile from '../common/profile/PersonProfile';
import SearchMessage from '../common/search/SearchMessage';
import {
  AudioOutlined,
  PaperClipOutlined,
  PictureOutlined,
  FolderOutlined,
  SearchOutlined,
  MoreOutlined,
  SendOutlined,
  ArrowLeftOutlined,
} from '@ant-design/icons';

const socket = io('http://192.168.0.107:4000');

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

  @media (max-width: 600px) {
    width: 100%;
    display: ${props =>
      props.openProfileInformation || props.openSearch ? 'none' : 'flex'};
  }
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

const MainScrollContent = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  width: 100%;
  overflow-x: scroll;
  scroll-snap-type: y mandatory;

  ::-webkit-scrollbar {
    width: 7px;
    height: 0px;
    display: flex;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 20px;
  }

  @media (width: 952px) {
    width: 100%;
    align-items: center;

    ::-webkit-scrollbar {
      width: 7px;
      height: 0px;
      display: flex;
    }

    ::-webkit-scrollbar-track {
      background: transparent;
    }

    ::-webkit-scrollbar-transform {
      transform: rotate(180deg);
    }

    ::-webkit-scrollbar-thumb {
      background-color: rgba(255, 255, 255, 0.2);
      border-radius: 20px;
    }
  }

  @media (max-width: 400px) {
    margin: 10px;
    height: 44px;
    width: 97%;
  }
`;

const ViewMessages = styled.div`
  display: flex;
  position: relative;
  width: 53%;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  /* scroll-snap-align: end; */

  @media (max-width: 1202px) {
    display: flex;
    width: 98%;
  }
`;

const ChatViewContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const Footer = styled.footer`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3px;
  width: 100%;

  @media (max-width: 500px) {
    padding: 1px;
  }
`;

const Items = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 54px;
  margin: 10px;

  @media (max-width: 1202px) {
    height: 54px;
    width: 98%;
  }

  @media (max-width: 400px) {
    height: 44px;
    width: 98%;
  }
`;

const SendMessageContent = styled.div`
  display: flex;
  align-items: center;
  border-radius: 13px 13px 13px 13px;
  background: #212121;
  height: 100%;
  width: 48%;

  @media (max-width: 1202px) {
    width: 98%;
  }
`;

const EmojiContent = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  background: transparent;
  border-radius: 50%;
  margin-left: 10px;
  height: 34px;
  width: 34px;

  &:hover {
    background: #383737;
  }
`;

const EmojiImage = styled.img`
  height: 70%;
`;

const Input = styled.input`
  display: flex;
  border: none;
  outline: none;
  background: none;
  font-size: 1.1rem;
  color: #ffffff;
  width: 100%;

  @media (max-width: 952px) {
    width: 100%;
  }
`;

const MenuClipButton = styled(Dropdown)`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  background: transparent;
  margin-right: 10px;
  border-radius: 50%;

  height: 38px;
  width: 45px;

  &:hover {
    background: #383737;
  }

  @media (max-width: 360px) {
    height: 30px;
    width: 45px;
  }
`;

const RecordContent = styled.div`
  display: flex;
  position: relative;

  margin-left: 8px;
`;

const SendMessageButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  background: #212121;
  border-radius: 50%;
  height: 54px;
  width: 54px;

  &:hover {
    background: #383737;
    transition: 0.2s;
  }

  @media (max-width: 400px) {
    height: 44px;
    width: 44px;
  }
`;

const Record = styled(AudioOutlined)`
  font-size: 23px;
`;

const Airplane = styled(SendOutlined)`
  font-size: 23px;
  color: #8774e1;
  &:hover {
    transition: 0.2s;
    transform: translateX(2px);
  }
`;

const PickContent = styled(Menu)`
  display: flex;
  justify-content: center;
  border-radius: 10px;
  width: 400px;
  top: -11px;

  @media (max-width: 400px) {
    position: relative;
    width: 100%;
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

const MenuClipItem = styled(Menu)`
  display: flex;
  flex-direction: column;
  background: #181717;
  margin: none;
  border-radius: 10px;
  overflow: hidden;
  top: -17px;
  left: 10px;
`;

const MenuItem = styled(Menu.Item)`
  height: 50px;
  font-size: 1rem;
  font-weight: 600;
  color: #d8d6d6;

  &&:hover {
    background: #252424;
    transition: 0.5s;
  }
`;

const Chat = ({ openChatMessage, closeChat }) => {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [sendMessage, setSendMessage] = useState('');

  const [openProfileInformation, setOpenProfileInformation] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [chosenEmoji, setChosenEmoji] = useState(null, false);

  // const body = useRef();

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

  const onEmojiClick = (event, emojiObject) => {
    setSendMessage(sendMessage + emojiObject.emoji);
    setChosenEmoji(emojiObject);
  };

  const openEmojiPicker = () => {
    setChosenEmoji(true);
  };

  const clearInput = () => {
    setSendMessage('');
  };

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

  const openEmoji = (
    <PickContent>
      {chosenEmoji ? (
        <Picker
          onEmojiClick={onEmojiClick}
          pickerStyle={{
            width: '100%',
            height: '250px',
            boxShadow: 'none',
          }}
        />
      ) : (
        ''
      )}
    </PickContent>
  );

  const menuClip = (
    <MenuClipItem>
      <MenuItem
        key="1"
        icon={
          <PictureOutlined style={{ fontSize: '23px', paddingRight: '20px' }} />
        }
      >
        Photo or Video
      </MenuItem>
      <MenuItem
        key="2"
        icon={
          <FolderOutlined style={{ fontSize: '23px', paddingRight: '20px' }} />
        }
      >
        Document
      </MenuItem>
    </MenuClipItem>
  );

  const ChatImage =
    'https://t3.ftcdn.net/jpg/03/02/41/08/240_F_302410851_oPS6nnVa0e2bexWL9vVR85kcha5uLkuz.jpg';

  const submit = async () => {
    const newMessage = { message: sendMessage, user: nick, id: Date.now() };
    setMessages([...messages, newMessage]);

    socket.emit('message', newMessage);

    // const body = JSON.stringify({
    //    user: `${nick}`,
    //    message: `${sendMessage}`,
    // });

    clearInput();
    // getData();
    // getUser();
  };

  const remove = () => {
    const rem = users.filter(item => item.id !== nick);
    setUsers(rem);
    console.log(rem);
  };

  useEffect(() => {
    const socket = io('http://192.168.0.107:4000');

    socket.on('messages', args => {
      setMessages(args);
    });
    // eslint-disable-next-line
  }, [socket]);

  // useEffect(() => {
  //   if (body.current.scrollHeigth > body.current.offsetHeigth) {
  //     body.current.scrollTop =
  //       body.current.scrollHeigth - body.current.offsetHeigth;
  //   }
  // }, [sendMessage]);

  // useEffect(() => {
  //    setInterval(() => {
  //       getData();
  //       getUser();
  //    }, 1000);
  // }, []);

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
            <ChatViewContent>
              <MainScrollContent>
                <ViewMessages
                  // ref={body}
                  style={{
                    width:
                      openProfileInformation || openSearch
                        ? '98%'
                        : '54%' < '98%',
                    transition:
                      openProfileInformation || openSearch ? '0s' : '0.2s',
                  }}
                >
                  {messages.map((data, index) => (
                    <Messages
                      key={data.id + index.toString()}
                      data={data}
                      user={nick}
                      openProfile={openProfile}
                      openSearch={openSearch}
                      remove={remove}
                    />
                  ))}
                </ViewMessages>
              </MainScrollContent>

              <Footer>
                <Items>
                  <SendMessageContent
                    style={{
                      width:
                        openProfileInformation || openSearch
                          ? '98%'
                          : '56%' > '98%',
                      transition:
                        openProfileInformation || openSearch ? '0s' : '0.2s',
                    }}
                  >
                    <Dropdown
                      onClick={openEmojiPicker}
                      overlay={openEmoji}
                      placement="topLeft"
                      overlayStyle={{ background: 'none' }}
                      trigger={['click']}
                    >
                      <EmojiContent>
                        <EmojiImage src={ImgEmoji} />
                      </EmojiContent>
                    </Dropdown>

                    <Input
                      onKeyPress={
                        sendMessage.length !== 0
                          ? e => e.key === 'Enter' && submit()
                          : null
                      }
                      placeholder="Message"
                      value={sendMessage}
                      type="text"
                      onChange={e => setSendMessage(e.target.value)}
                    />

                    <MenuClipButton
                      overlay={menuClip}
                      placement="topRight"
                      trigger={['click']}
                    >
                      <PaperClipOutlined
                        style={{
                          fontSize: '23px',
                          color: '#bebfc0',
                        }}
                      />
                    </MenuClipButton>
                  </SendMessageContent>

                  <RecordContent>
                    <SendMessageButton
                      type="submit"
                      onClick={submit}
                      disabled={sendMessage.length === 0}
                    >
                      {sendMessage.length === 0 && (
                        <Record
                          style={{
                            color: '#bebfc0',
                          }}
                        />
                      )}
                      {sendMessage.length !== 0 && (
                        <Airplane src={ImgAirplane} />
                      )}
                    </SendMessageButton>
                  </RecordContent>
                </Items>
              </Footer>
            </ChatViewContent>
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
