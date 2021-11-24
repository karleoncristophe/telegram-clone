import styled from 'styled-components';

import {
  SearchOutlined,
  MoreOutlined,
  ArrowLeftOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { Menu, Dropdown } from 'antd';

import UserImage from '../../assets/icons/user.png';

const Container = styled.div`
  display: flex;
  align-items: center;
  background: #212121;
  height: 56px;
  width: 100%;
  padding: 5px;
  @media (max-width: 300px) {
    height: 50px;
  }
`;

const ProfileContent = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const ProfileContentButton = styled.button`
  display: flex;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  border: none;
  background: url(${UserImage});
  background-size: cover;

  @media (max-width: 300px) {
    width: 40px;
    height: 40px;
  }
`;

const ProfileInformationContent = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  @media (max-width: 300px) {
    margin-left: 10px;
  }
`;

const ProfileName = styled.span`
  font-size: 1.1rem;
  font-weight: 600;
  color: #ffff;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 250px;

  @media (max-width: 952px) {
    font-size: 1rem;
    width: 150px;
  }

  @media (max-width: 350px) {
    width: 120px;
  }

  @media (max-width: 300px) {
    width: 90px;
  }
`;

const ProfileView = styled.span`
  font-size: 1rem;
  font-weight: 600;
  color: #6e6c6c;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 150px;

  @media (max-width: 952px) {
    font-size: 0.8rem;
    width: 150px;
  }

  @media (max-width: 350px) {
    width: 120px;
  }

  @media (max-width: 300px) {
    width: 90px;
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

const LeftArowButton = styled.button`
  border-radius: 50%;
  border: none;
  width: 40px;
  height: 40px;
  margin-right: 10px;
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

const Trash = styled(DeleteOutlined)`
  font-size: 1.1rem;
  color: #ec5b5b;
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

const Header = ({
  data,
  closeChat,
  openSearch,
  openProfile,
  openMessageFinder,
  openProfileInformation,
}) => {
  const deleteChat = (
    <MenuOptions>
      <DeleteChatContent>
        <Trash />
        <DeleteChat>Delete Chat</DeleteChat>
      </DeleteChatContent>
    </MenuOptions>
  );

  return (
    <Container>
      <ProfileContent>
        <LeftArowButton onClick={closeChat}>
          <LeftArowImage />
        </LeftArowButton>
        <ProfileContentButton
          onClick={openProfile}
          disabled={openSearch === true}
        />

        <ProfileInformationContent>
          <ProfileName>{data?.name}</ProfileName>
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
          trigger={['click']}
        >
          <MoreOptions>
            <ImageMenu />
          </MoreOptions>
        </Dropdown>
      </SearchAndMenuContent>
    </Container>
  );
};

export default Header;
