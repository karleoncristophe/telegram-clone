import { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import styled from 'styled-components';
import io from 'socket.io-client';
import ImgEmoji from '../../assets/icons/emoji.png';
import ImgAirplane from '../../assets/icons/sendmessage.png';
import Messages from './Messages';
import Picker from 'emoji-picker-react';
import { Menu, Dropdown } from 'antd';
import {
  AudioOutlined,
  PaperClipOutlined,
  PictureOutlined,
  SendOutlined,
  FolderOutlined,
} from '@ant-design/icons';

const socket = io('http://192.168.0.107:4000');

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  overflow: hidden;

  @media (max-width: 1202px) {
    width: 100%;
  }
`;

const MainScrollContent = styled.main`
  display: flex;
  flex-direction: column;
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

const ViewMessageContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
`;

const ViewMessage = styled.div`
  display: flex;

  flex-direction: column;
  width: 60%;

  @media (max-width: 1600px) {
    display: flex;
    width: 70%;
  }

  @media (max-width: 1202px) {
    display: flex;
    width: 98%;
  }
`;

const Footer = styled.footer`
  display: flex;
  justify-content: center;
  padding: 3px;
  width: 100%;
  @media (max-width: 500px) {
    padding: 1px;
  }
`;

const Items = styled.div`
  display: flex;
  justify-content: center;

  height: 54px;
  margin: 10px;

  width: 60%;

  @media (max-width: 1600px) {
    display: flex;
    width: 70%;
  }

  @media (max-width: 1202px) {
    display: flex;
    width: 98%;
  }
`;

const SendMessageContent = styled.div`
  display: flex;
  align-items: center;
  border-radius: 13px 13px 13px 13px;
  background: #212121;
  height: 100%;
  width: 100%;
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

const ViewMessages = ({ openProfileInformation, openSearch, openProfile }) => {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [sendMessage, setSendMessage] = useState('');
  const [chosenEmoji, setChosenEmoji] = useState(null, false);

  const location = useLocation();
  const nick = location.state.user;

  const openEmojiPicker = () => {
    setChosenEmoji(true);
  };

  const onEmojiClick = (event, emojiObject) => {
    setSendMessage(sendMessage + emojiObject.emoji);
    setChosenEmoji(emojiObject);
  };

  const clearInput = () => {
    setSendMessage('');
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

  const submit = async () => {
    const newMessage = { message: sendMessage, user: nick, id: Date.now() };
    setMessages([...messages, newMessage]);

    socket.emit('message', newMessage);
    clearInput();
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
  return (
    <Container>
      <MainScrollContent>
        <ViewMessageContent>
          <ViewMessage
            style={{
              transition: openProfileInformation || openSearch ? '0s' : '0.2s',
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
          </ViewMessage>
        </ViewMessageContent>
      </MainScrollContent>

      <Footer>
        <Items>
          <SendMessageContent
            style={{
              transition: openProfileInformation || openSearch ? '0s' : '0.2s',
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
              {sendMessage.length !== 0 && <Airplane src={ImgAirplane} />}
            </SendMessageButton>
          </RecordContent>
        </Items>
      </Footer>
    </Container>
  );
};

export default ViewMessages;
