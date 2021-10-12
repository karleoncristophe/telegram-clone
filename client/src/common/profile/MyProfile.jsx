import { useState, useEffect } from 'react';
import { MoreOutlined, ImportOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { Menu, Dropdown, Modal } from 'antd';
import styled from 'styled-components';
import LeftArrowImg from '../../assets/icons/left-arrow.png';
import PencilImg from '../../assets/icons/pencil.svg';
import TrashImg from '../../assets/icons/trash.svg';
import UserImage from '../../assets/icons/user.png';
import api from '../../services/api';

const ProfileContent = styled.div`
  background: #212121;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;

  @media (max-width: 1202px) {
    height: 100%;
    width: 100%;
  }
`;

const ProfileAvatarContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AvatarContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const ProfileNameContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  width: 100%;
`;

const ProfileName = styled.span`
  font-size: 1.5rem;
  font-weight: 550;
  color: #ffff;
  line-height: 22px;
  margin-top: 10px;

  word-wrap: break-word;
`;

const ProfileBio = styled.span`
  font-size: 1.1rem;
  margin-top: 10px;
  text-align: center;
  font-weight: 500;
  color: #ffff;
  line-height: 22px;
  color: #868585;
  word-wrap: break-word;
`;

const SettingsContainer = styled.div`
  display: flex;
  width: 100%;
  height: 50px;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
`;

const SettingsContent = styled.div`
  display: flex;
`;

const LeftArowButton = styled.button`
  border-radius: 50%;
  border: none;
  width: 36px;
  background: none;

  &:hover {
    background: #383737;
    transition: 1s;
  }
`;

const LeftArowImage = styled.img`
  height: 20px;
`;

const MenuImageButton = styled(Dropdown)`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  height: 34px;
  width: 35px;
  border: none;
  background: none;

  &:hover {
    background: #383737;
    transition: 1s;
  }
`;

const MenuImage = styled(MoreOutlined)`
  font-size: 22px;
  color: #ffff;
`;
const SettingsTitle = styled.span`
  font-size: 1.4rem;
  color: #ffff;
  margin-left: 30px;
  font-weight: 550;
`;

const DeleteAccountButton = styled.button`
  display: flex;
  align-items: center;
  padding: 0px 20px 0px 20px;
  height: 56px;
  border-radius: 5px;
  width: 100%;
  border: none;
  background: none;
  &:hover {
    background: #383737;
    transition: 1s;
  }
`;
const DeleteAccount = styled.span`
  color: #ec5b5b;
  font-weight: 600;
  font-size: 1.1rem;
  margin-left: 25px;
  letter-spacing: 1px;
`;

const TrashImage = styled.img`
  height: 22px;
`;

const EditProfileContent = styled.div`
  height: 100%;
  width: 100%;
`;

const EditProfileButton = styled.button`
  display: flex;
  align-items: center;
  padding: 0px 20px 0px 20px;
  height: 56px;
  border-radius: 5px;
  border: none;
  background: none;
  margin-top: 20px;
  width: 100%;

  &:hover {
    background: #383737;
    transition: 1s;
  }
`;

const EditProfileSpan = styled.span`
  color: #ffffff;
  letter-spacing: 1px;
  font-weight: 600;
  font-size: 1.1rem;
  margin-left: 25px;
`;

const EditUserImage = styled.img`
  height: 22px;
`;

const ToHome = styled(Link)`
  display: flex;
  position: relative;
  background: #2f2f2f;
  border-radius: 4px;
  width: 150px;
  right: 10px;
`;

const LogOut = styled(Menu)`
  display: flex;
  background: #2f2f2f;
  width: 100%;
`;

const LogOutItem = styled(Menu.Item)`
  display: flex;
  align-items: center;
  height: 50px;
  font-size: 1rem;
  font-weight: 600;
  color: #aca6a6;
  width: 100%;

  &&:hover {
    background: #424242;
  }
`;

const ModalContent = styled(Modal)`
  display: flex;
`;

const ProfileAvatar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: url(${UserImage});
  border: none;
  background-size: cover;
  width: 156px;
  height: 156px;
  margin-top: 20px;
  border-radius: 50%;
`;

const MyProfile = ({ settings, openEdit }) => {
  const [user, setUser] = useState();
  const [visible, setVisible] = useState(false);

  const modalVisible = () => {
    setVisible(true);
  };

  const logOut = (
    <ToHome to="/">
      <LogOut>
        <LogOutItem
          icon={
            <ImportOutlined
              style={{
                fontSize: '23px',
                paddingRight: '10px',
              }}
            />
          }
        >
          Log Out
        </LogOutItem>
      </LogOut>
    </ToHome>
  );

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const { data } = await api.get('me');
        setUser(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRepos();
    // eslint-disable-next-line
  }, [user]);

  return (
    <ProfileContent>
      <SettingsContainer>
        <SettingsContent>
          <LeftArowButton onClick={settings}>
            <LeftArowImage src={LeftArrowImg} />
          </LeftArowButton>
          <SettingsTitle>Settings</SettingsTitle>
        </SettingsContent>
        <MenuImageButton
          overlay={logOut}
          placement="bottomRight"
          trigger={['click']}
        >
          <MenuImage />
        </MenuImageButton>
      </SettingsContainer>
      <ProfileAvatarContent>
        <ProfileAvatar />
      </ProfileAvatarContent>
      <AvatarContent style={{ height: '250px' }}>
        <ProfileNameContent>
          <ProfileName>{user?.name}</ProfileName>
          <ProfileBio>Bio: {user?.bio}</ProfileBio>
        </ProfileNameContent>
      </AvatarContent>
      <EditProfileContent>
        <EditProfileButton onClick={openEdit}>
          <EditUserImage src={PencilImg} />
          <EditProfileSpan>Edit Profile</EditProfileSpan>
        </EditProfileButton>
        <DeleteAccountButton onClick={() => modalVisible(true)} type="primary">
          <TrashImage src={TrashImg} />
          <DeleteAccount>Delete Acount</DeleteAccount>
        </DeleteAccountButton>
        <ModalContent
          title="Delete Account"
          centered
          visible={visible}
          onOk={() => setVisible(false)}
          onCancel={() => setVisible(false)}
        >
          Do you really want to delete your account?
        </ModalContent>
      </EditProfileContent>
    </ProfileContent>
  );
};

export default MyProfile;
