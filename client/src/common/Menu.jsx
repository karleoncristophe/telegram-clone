import styled from 'styled-components';
import { useState } from 'react';
import { Avatar, Menu, Dropdown } from 'antd';
import MenuOption from '../assets/icons/menu.png';
import ViewImg from '../assets/icons/viewblack.png';
import SearchChat from '../common/menuComponents/SearchChat';
import EditProfile from '../common/menuComponents/EditProfile';
import MyProfile from '../common/menuComponents/MyProfile';
import {
  SettingOutlined,
  UserOutlined,
  CarryOutOutlined,
  MenuOutlined,
  SearchOutlined,
} from '@ant-design/icons';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  background: #212121;
  width: 420px;

  @media (max-width: 1202px) {
    width: 40%;
  }

  @media (max-width: 911px) {
    width: 100%;
    display: ${props => (props.openChatMessage ? 'none' : 'flex')};
  }
`;

const Head = styled.header`
  display: flex;
  justify-content: center;
  height: 56px;
  width: 100%;
`;

const OptionsAndSearchContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  @media (max-width: 1202px) {
    padding: 10px;
  }
`;

const Options = styled.button`
  display: flex;
  background: none;
  border-radius: 50%;
  height: 42px;
  width: 42px;
  border: none;
  margin-right: 5px;
  align-items: center;
  justify-content: center;
  &:hover {
    background: #383737;
  }

  @media (max-width: 1202px) {
    height: 36.8px;
    width: 36.8px;
  }
`;

const ImageMenu = styled(MenuOutlined)`
  font-size: 18px;
  color: #8a8787;
`;

const SearchButton = styled.button`
  display: flex;
  align-items: center;
  border-radius: 20px;
  border: 1px solid #2f2f2f;
  background: #181818;
  height: 42px;
  width: 80%;
  &:hover {
    border: 1px solid #3f3f3f;
  }

  @media (max-width: 1202px) {
    width: 88%;
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
  color: #8a8787;
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

const ChatListContainer = styled.main`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  overflow: scroll;
  align-items: center;

  @media (width: 1202px) {
    width: 100%;

    ::-webkit-scrollbar {
      width: 7px;
      height: 0px;
    }

    ::-webkit-scrollbar-track {
      background: transparent; /* color of the tracking area */
    }

    ::-webkit-scrollbar-thumb {
      background-color: rgba(255, 255, 255, 0.2);
      border-radius: 20px;
    }
  }

  ::-webkit-scrollbar {
    width: 7px;
    height: 0px;
  }

  ::-webkit-scrollbar-track {
    background: transparent; /* color of the tracking area */
  }

  ::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 20px;
  }
`;

const ChatMenuButton = styled.button`
  display: flex;
  align-items: center;
  width: 96%;
  height: 72px;
  padding: 9px;
  background: none;
  border-radius: 18px;
  outline: none;
  border: none;
  margin-top: 2px;

  @media (max-width: 1202px) {
    width: 96% !important;
  }

  &:hover {
    background: #292929;
  }

  &:focus {
    background: #8774e1;
  }

  @media (max-width: 908px) {
    width: 80%;
  }
`;

const ProfileAvatar = styled(Avatar)`
  margin-left: 5px;

  @media (max-width: 1202px) {
    width: 4.12rem;
  }
`;

const ProfileInformation = styled.div`
  display: flex;
  text-align: left;
  flex-direction: column;
  margin-left: 10px;
  width: 100%;
`;

const NameViewAndHourContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Name = styled.span`
  font-size: 1.1rem;
  font-weight: 600;
  color: #ffff;
`;

const ViewAndHourContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 50px;
`;

const View = styled.div``;

const ViewImage = styled.img`
  height: 13px;
`;

const Hour = styled.span`
  font-size: 0.8rem;
  font-weight: 550;
  color: #6e6c6c;
`;

const Message = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 1rem;
  font-weight: 550;
  color: #6e6c6c;
`;

const DropdownContent = styled(Dropdown)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MenuOptions = styled(Menu)`
  display: flex;
  flex-direction: column;
  width: 200px;
  background: #2f2f2f;
  margin: none;
  border-radius: 4px;
  margin-top: 8px;
`;

const MenuItem = styled(Menu.Item)`
  height: 50px;
  font-size: 1rem;
  color: #aca6a6;

  &&:hover {
    background: #424242;
  }
`;

const ChatMenu = ({ name, openChat, openChatMessage }) => {
  const [search, setSearch] = useState('');
  const [openSettings, setOpenSettings] = useState(false);
  const [openEditProfile, setOpenEditProfile] = useState(false);
  const [searchPeople, setSearchPeople] = useState(false);

  const settings = () => {
    setOpenSettings(prev => !prev);
  };

  const openEdit = () => {
    setOpenEditProfile(prev => !prev);
  };

  const openSearch = () => {
    setSearchPeople(true);
  };

  const closeSearch = () => {
    setSearchPeople(false);
  };

  const menu = (
    <MenuOptions>
      <MenuItem
        key="1"
        icon={
          <CarryOutOutlined
            style={{
              fontSize: '23px',
              paddingRight: '20px',
            }}
          />
        }
      >
        Salved Messages
      </MenuItem>
      <MenuItem
        key="2"
        icon={
          <UserOutlined style={{ fontSize: '23px', paddingRight: '20px' }} />
        }
      >
        Contacts
      </MenuItem>
      <MenuItem
        key="3"
        icon={
          <SettingOutlined style={{ fontSize: '23px', paddingRight: '20px' }} />
        }
        onClick={settings}
      >
        Settings
      </MenuItem>
    </MenuOptions>
  );

  const ChatImage =
    'https://t3.ftcdn.net/jpg/03/02/41/08/240_F_302410851_oPS6nnVa0e2bexWL9vVR85kcha5uLkuz.jpg';

  return (
    <Container openChatMessage={openChatMessage}>
      {openSettings ? (
        <>
          {openEditProfile ? (
            <EditProfile openEdit={openEdit} />
          ) : (
            <MyProfile settings={settings} openEdit={openEdit} />
          )}
        </>
      ) : (
        <>
          {searchPeople ? (
            <SearchChat closeSearch={closeSearch} openChat={openChat} />
          ) : (
            <>
              <Head>
                <OptionsAndSearchContent>
                  <DropdownContent overlay={menu} trigger={['click']}>
                    <Options>
                      <ImageMenu src={MenuOption} />
                    </Options>
                  </DropdownContent>

                  <SearchButton onClick={openSearch}>
                    <ImageSearchContent>
                      <ImageSearch />
                    </ImageSearchContent>
                    <SearchInput
                      placeholder="Search"
                      value={search}
                      onChange={e => setSearch(e.target.value)}
                    />
                  </SearchButton>
                </OptionsAndSearchContent>
              </Head>
              <ChatListContainer>
                <ChatMenuButton onClick={openChat}>
                  <ProfileAvatar
                    size={52}
                    style={{ width: '64px' }}
                    src={ChatImage}
                  />
                  <ProfileInformation>
                    <NameViewAndHourContent>
                      <Name>Chat</Name>
                      <ViewAndHourContent>
                        <View>
                          <ViewImage src={ViewImg}></ViewImage>
                        </View>
                        <Hour>21:00</Hour>
                      </ViewAndHourContent>
                    </NameViewAndHourContent>
                    <Message>Click to enter chat</Message>
                  </ProfileInformation>
                </ChatMenuButton>
              </ChatListContainer>
            </>
          )}
        </>
      )}
    </Container>
  );
};

export default ChatMenu;
