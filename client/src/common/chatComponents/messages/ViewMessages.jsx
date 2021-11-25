import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

import ImgEmoji from '../../../assets/icons/emoji.png';

import Picker from 'emoji-picker-react';
// import Lottie from 'react-lottie';
// import * as location from '../../assets/icons/1055-world-locations.json';
import { Menu, Dropdown } from 'antd';
import {
  AudioOutlined,
  PaperClipOutlined,
  SendOutlined,
} from '@ant-design/icons';

import UploadImage from '../UploadImage';
import Messages from './Messages';

import api from '../../../services/api';

const socket = io('http://192.168.0.107:4000');

// const LottieContent = styled.div`
//   display: flex;
//   flex-direction: column;
//   height: 100%;
//   width: 100%;
//   overflow: hidden;
//   justify-content: center;
// `;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  overflow: hidden;
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

  width: ${props =>
    props.openProfileInformation || props.openSearch ? '98%' : '60%'};

  transition: ${props =>
    props.openProfileInformation || props.openSearch ? '0.2s' : '0.2s'};

  @media (max-width: 1600px) {
    display: flex;
    width: ${props =>
      props.openProfileInformation || props.openSearch ? '98%' : '70%'};
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
`;

const Items = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 54px;
  margin: 10px;
  width: ${props =>
    props.openProfileInformation || props.openSearch ? '98%' : '60%'};
  transition: ${props =>
    props.openProfileInformation || props.openSearch ? '0.2s' : '0.2s'};

  @media (max-width: 1600px) {
    display: flex;
    width: ${props =>
      props.openProfileInformation || props.openSearch ? '98%' : '70%'};
  }

  @media (max-width: 1202px) {
    display: flex;
    width: 98%;
  }

  @media (max-width: 400px) {
    height: 44px;
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

// const defaultLocation = {
//   loop: true,
//   autoplay: true,
//   animationData: location.default,
//   rendererSettings: {
//     preserveAspectRatio: 'xMidYMid slice',
//   },
// };

const ViewMessages = ({
  openProfileInformation,
  openSearch,
  openProfile,
  users,
  dataInformatios,
}) => {
  const [user, setUser] = useState('');
  // eslint-disable-next-line
  const [state, setState] = useState({});
  const [messages, setMessages] = useState([]);
  const [sendMessage, setSendMessage] = useState('');
  const [chosenEmoji, setChosenEmoji] = useState(null, false);

  const myName = user._id;
  const personName = users;
  // const [loading, setLoading] = useState(false);

  const openEmojiPicker = () => {
    setChosenEmoji(true);
  };

  const onEmojiClick = emojiObject => {
    setSendMessage(sendMessage + emojiObject.emoji);
    setChosenEmoji(emojiObject);
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

  const menuClip = <UploadImage />;

  const submit = async () => {
    const newMessage = {
      message: sendMessage,
      userFrom: myName,
      userTo: personName,
      id: Date.now(),
    };
    await socket.emit('messages', newMessage);
    await setMessages([...messages, newMessage]);
    const { data } = await api.get('messages');
    setMessages(data);
    setSendMessage('');
  };

  // const remove = () => {
  //   const rem = users.filter(item => item.id !== nick);
  //   setUsers(rem);
  //   console.log(rem);
  // };

  useEffect(() => {
    const socket = io('http://192.168.0.107:4000');

    socket.on('messages', args => {
      setMessages(args);
    });

    // eslint-disable-next-line
  }, [socket]);

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await api.get('me');
        setUser(data);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
    return () => {
      setState({}); // update an unmounted component
    };
    // eslint-disable-next-line
  }, []);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setLoading(true);
  //   }, [1500]);
  // }, []);
  return (
    // <>
    //   {loading ? (
    <Container>
      <MainScrollContent>
        <ViewMessageContent>
          <ViewMessage
            openProfileInformation={openProfileInformation}
            openSearch={openSearch}
          >
            {messages.map((data, index) => (
              <Messages
                key={data.id + index.toString()}
                data={data}
                myName={myName}
                personName={dataInformatios.name}
                openProfile={openProfile}
                openSearch={openSearch}
                setMessages={setMessages}
              />
            ))}
          </ViewMessage>
        </ViewMessageContent>
      </MainScrollContent>

      <Footer>
        <Items
          openProfileInformation={openProfileInformation}
          openSearch={openSearch}
        >
          <SendMessageContent>
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
              {sendMessage.length !== 0 && <Airplane />}
            </SendMessageButton>
          </RecordContent>
        </Items>
      </Footer>
    </Container>
    //   ) : (
    //     <LottieContent>
    //       <Lottie options={defaultLocation} height={200} width={200} />
    //     </LottieContent>
    //   )}
    // </>
  );
};

export default ViewMessages;
