import styled from 'styled-components';
import { useEffect, useState } from 'react';

import { ArrowLeftOutlined } from '@ant-design/icons';
import { CameraOutlined } from '@ant-design/icons';
import { message, Modal } from 'antd';

import CheckedImg from '../../assets/icons/checked.png';
import UserImage from '../../assets/icons/user.png';

import api from '../../services/api';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  overflow-x: scroll;
  scroll-snap-type: y mandatory;

  ::-webkit-scrollbar {
    width: 7px;
    height: 0px;
    display: flex;
  }

  ::-webkit-scrollbar-track {
    background: transparent; /* color of the tracking area */
  }

  ::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 20px;
  }
`;

const UserNameContent = styled.div`
  background: #212121;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const EditContent = styled.div`
  background: #212121;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 1202px) {
    /* height: 100%; */
    /* width: 100%; */
  }
`;

const SettingsContainer = styled.div`
  display: flex;
  width: 100%;
  height: 50px;
  align-items: center;
  padding-left: 10px;
  padding-right: 10px;
  justify-content: space-between;
`;

const SettingsContent = styled.div`
  display: flex;
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

const LeftArowImage = styled(ArrowLeftOutlined)`
  font-size: 1.25rem;
`;

const SettingsTitle = styled.span`
  font-size: 1.4rem;
  color: #ffff;
  margin-left: 30px;
  font-weight: 550;
`;

const AvatarContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 200px;
  margin-top: 10px;
`;

const ProfileAvatarEdit = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: url(${UserImage});
  border: none;
  background-size: cover;
  width: 156px;
  height: 156px;
  border-radius: 50%;

  @media (max-width: 1202px) {
    width: 156px;
  }
`;

const ChooseImageContent = styled.form`
  display: flex;
  overflow: hidden;
  justify-content: center;
  align-items: center;
  border: none;
  width: 100%;
  height: 100%;
  border-radius: 50%;
`;

const ChooseImageInput = styled.input`
  border: none;
  display: none;
  background: none;
  width: 100%;
  height: 100%;
`;

const ChooseImage = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: none;
  width: 100%;
  height: 100%;
  cursor: pointer;
  background: #0a0a0a90;
  transition: 1s;

  &:hover {
    background: #000000ae;
  }
`;

const Camera = styled(CameraOutlined)`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 45px;
  height: 100%;
  width: 100%;
  transition: 0.8s;
  color: #fff;
  &&:hover {
    font-size: 55px;
  }
`;

const EditNameAndBioContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 95%;
`;

const EditNameTitle = styled.span`
  display: flex;
  position: relative;
  margin-left: 8px;
  top: 12px;
  z-index: 1;
  width: 44px;

  background: #212121;
  font-size: 0.9rem;
  color: #8774e1;
  font-weight: 560;
  padding-left: 4px;
  padding-right: 4px;
`;

const EditBioTitle = styled.span`
  display: flex;
  position: relative;
  margin-left: 8px;
  top: 12px;
  z-index: 1;
  width: 93px;

  background: #212121;
  font-size: 0.9rem;
  color: #8774e1;
  font-weight: 560;
  padding-left: 4px;
  padding-right: 4px;
`;

const EditUsernameTitle = styled.span`
  display: flex;
  position: relative;
  margin-left: 8px;
  top: 12px;
  z-index: 1;
  width: 136px;

  background: #212121;
  font-size: 0.9rem;
  color: #8774e1;
  font-weight: 560;
  padding-left: 4px;
  padding-right: 4px;
`;

const EditInput = styled.input`
  width: 100%;
  height: 54px;
  border-radius: 10px;
  border: 1px solid #2f2f2f;
  background: none;
  outline: none;
  color: #ffff;
  font-weight: 570;
  font-size: 1rem;
  padding-left: 10px;

  ::-webkit-input-placeholder {
    font-size: 1rem;
  }

  &:hover {
    border: 1px solid #8774e1;
  }

  &:focus {
    border: 2px solid #8774e1;
  }
`;

const ConfirmEditButtonContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 95%;
`;

const ConfirmEditButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 1px solid #2f2f2f;
  background: #8774e1;
  color: #ffff;
  font-weight: 570;
  font-size: 1rem;
  margin-top: 20px;
  transition: 1s;
`;

const Space = styled.div`
  height: 1px;
  width: 100%;
  background: #131313;
  margin-top: 10px;
`;

const Info = styled.p`
  margin-top: 20px;
  /* background: red; */
  font-size: 1rem;
  color: #6e6c6c;
  width: 70%;
  line-height: 15px;

  @media (max-width: 320px) {
    width: 100%;
  }
`;
const HeaderInfo = styled.span`
  margin-top: 20px;
  /* background: red; */
  font-size: 0.9rem;
  color: #8b8a8a;
  width: 100%;
  line-height: 15px;
`;

const MainInfo = styled.span`
  margin-top: 48px;
  /* background: red; */
  font-size: 0.9rem;
  color: #8b8a8a;
  width: 100%;
  line-height: 15px;
`;

const EndInfo = styled.span`
  margin-top: 20px;
  /* background: red; */
  font-size: 0.9rem;
  color: #8b8a8a;
  width: 100%;
  line-height: 15px;
`;

const EndInfoHttp = styled.a`
  /* margin-top: 20px; */
  /* background: red; */
  font-size: 0.9rem;
  color: #8774e1;
  width: 100%;
  line-height: 15px;
  margin-bottom: 40px;
`;

const Title = styled.span`
  /* background: red; */
  width: 100%;
  font-size: 1.1rem;
  margin-top: 20px;
  color: #8774e1;
  @media (max-width: 320px) {
    width: 100%;
  }
`;

const CheckedImage = styled.img`
  height: 16px;
`;

const ModalContent = styled(Modal)`
  display: flex;
`;

const Image = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  width: 100%;
  height: 100%;
`;

const EditProfile = ({ openEdit }) => {
  const [user, setUser] = useState('');
  const [name, setName] = useState('');
  const [userName, setUserName] = useState('');
  const [bio, setBio] = useState('');
  const [visible, setVisible] = useState(false);
  const [imageModal, setImageModal] = useState(true);
  const [image, setImage] = useState('');
  // eslint-disable-next-line
  const [imageUrl, setImageUrl] = useState(null);
  // eslint-disable-next-line
  const [state, setState] = useState({});

  const update = async () => {
    const body = {
      name: name,
      bio: bio,
      username: userName,
      imageUrl: imageUrl,
    };

    try {
      const { data } = await api.put(`users/${user._id}`, body);
      setUser(data);
      message.success('Usuário Atualizado.');
    } catch (error) {
      console.log(error);
    }

    setVisible(false);
  };

  const uploadImage = async e => {
    e.preventDefault();
    openEdit();
    setImage(e.target.files[0]);
    const formData = new FormData();
    formData.append('file', image);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(formData);
    };

    try {
      const { data } = await api.post('postImage', formData);
      update();
      console.log(data);
      message.success('Imagem enviada.');
    } catch (error) {
      message.error('Imagem não enviada.');
    }
  };

  const modalVisible = () => {
    setVisible(true);
  };

  const closeModal = () => {
    // openEdit();
    setImageModal(false);
    setImage('');
  };

  useEffect(() => {
    setName(`${user.name}`);
    setBio(user.bio === undefined || '' ? 'No biography.' : `${user.bio}`);
    setUserName(`${user.username}`);

    return () => {
      setState({}); // update an unmounted component
    };
  }, [user]);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const { data } = await api.get('me');
        setUser(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRepos();
    return () => {
      setState({}); // update an unmounted component
    };
  }, []);

  return (
    <>
      <SettingsContainer>
        <SettingsContent>
          <LeftArowButton onClick={openEdit}>
            <LeftArowImage />
          </LeftArowButton>
          <SettingsTitle>Settings</SettingsTitle>
        </SettingsContent>
      </SettingsContainer>
      <Container>
        <EditContent>
          <AvatarContent>
            <ProfileAvatarEdit>
              <ChooseImageContent onSubmit={uploadImage}>
                <Image
                  style={{
                    background: `url("${image}")`,
                    backgroundSize: 'cover',
                  }}
                >
                  <ChooseImageInput
                    type="file"
                    id="img"
                    onChange={uploadImage}
                  />
                  <ChooseImage htmlFor="img">
                    <Camera />
                  </ChooseImage>
                </Image>
              </ChooseImageContent>
            </ProfileAvatarEdit>
            {image.length !== 0 && (
              <Modal
                title="Update your profile picture."
                centered
                visible={imageModal}
                onOk={uploadImage}
                onCancel={closeModal}
              >
                Do you want to change your profile picture?
              </Modal>
            )}
          </AvatarContent>
          <EditNameAndBioContent>
            <EditNameTitle>Name</EditNameTitle>
            <EditInput
              placeholder="Name"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </EditNameAndBioContent>
          <EditNameAndBioContent>
            <EditBioTitle>Bio (optional)</EditBioTitle>
            <EditInput
              placeholder="Bio (optional)"
              value={bio}
              onChange={e => setBio(e.target.value)}
            />
          </EditNameAndBioContent>

          <EditNameAndBioContent>
            <Info>
              Any details such as age, occupation or city. Example: 23 y.o.
              designer from San Francisco
            </Info>
          </EditNameAndBioContent>
        </EditContent>
        <UserNameContent>
          <Space />
          <EditNameAndBioContent>
            <Title>Username</Title>
            <EditUsernameTitle>Username (optional)</EditUsernameTitle>
            <EditInput
              placeholder="Username (optional)"
              value={userName}
              onChange={e => setUserName(e.target.value)}
            />
            <HeaderInfo>
              You can choose a username on Telegram. If you do, people will be
              able to find you by this username and contact you without needing
              your phone number.
            </HeaderInfo>
            <MainInfo>
              You can use a-z, 0-9 and underscores. Minimum length is 5
              characters.
            </MainInfo>
            <EndInfo>This link opens a chat with you:</EndInfo>
            <EndInfoHttp>http/usuario.com</EndInfoHttp>
          </EditNameAndBioContent>
          {name || userName || bio !== '' ? (
            <ConfirmEditButtonContent>
              <ConfirmEditButton onClick={modalVisible}>
                <CheckedImage src={CheckedImg} />
              </ConfirmEditButton>
            </ConfirmEditButtonContent>
          ) : null}
          <ModalContent
            title="Update data"
            centered
            visible={visible}
            onOk={update}
            onCancel={() => setVisible(false)}
          >
            Do you want to change your name, username or bio?
          </ModalContent>
        </UserNameContent>
      </Container>
    </>
  );
};

export default EditProfile;
