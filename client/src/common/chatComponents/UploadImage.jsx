import { useState } from 'react';
import { Modal } from 'antd';
import { PictureOutlined, FolderOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import api from '../../services/api';

const Container = styled.form`
  overflow: hidden;
  border-radius: 10px;
  position: relative;
  top: -17px;
  left: 10px;
  display: flex;
  flex-direction: column;
  background: #181717;
`;

const ChooseImageInput = styled.input`
  display: none;
`;

const ChooseImageConent = styled.label`
  display: flex;
  align-items: center;
  padding-left: 10px;
  padding-right: 10px;
  height: 50px;
  font-size: 1rem;
  font-weight: 600;
  color: #d8d6d6;

  &&:hover {
    background: #252424;
    transition: 0.5s;
  }
`;

const ChooseImage = styled.span`
  font-size: 1rem;
  font-weight: 600;
  color: #d8d6d6;
`;

const PictureOutlinedImage = styled(PictureOutlined)`
  font-size: 1.3rem;
  margin-right: 10px;
  color: #d8d6d6;
`;

const FolderOutlinedImage = styled(FolderOutlined)`
  font-size: 1.3rem;
  margin-right: 10px;
  color: #d8d6d6;
`;

const UploadImage = () => {
  const [image, setImage] = useState('');
  const [imageModal, setImageModal] = useState(true);
  const uploadImage = async e => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('file', image);
    try {
      const { data } = await api.post('postImage', formData);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const closeModal = () => {
    // openEdit();
    setImageModal(false);
    setImage('');
  };

  return (
    <Container onSubmit={uploadImage}>
      <ChooseImageInput
        type="file"
        id="img"
        onChange={e => setImage(e.target.files[0])}
      />

      <ChooseImageConent htmlFor="img">
        <PictureOutlinedImage />
        <ChooseImage>Photo or Video</ChooseImage>
      </ChooseImageConent>
      <ChooseImageConent htmlFor="img">
        <FolderOutlinedImage />
        <ChooseImage>Document</ChooseImage>
      </ChooseImageConent>

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
    </Container>
  );
};

export default UploadImage;
