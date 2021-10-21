import styled from 'styled-components';
import { PictureOutlined, FolderOutlined } from '@ant-design/icons';
import api from '../../services/api';
import { useState } from 'react';

const Container = styled.form`
  display: flex;
  margin: none;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  top: -7px;
  left: 10px;
  background: #181717;
`;

const ChooseImageInput = styled.input`
  display: none;
`;
const ChooseImage = styled.label`
  display: flex;
  flex-direction: column;
`;

const MenuItem = styled.div`
  display: flex;
  height: 50px;
  font-size: 1rem;
  font-weight: 600;
  color: #d8d6d6;
  align-items: center;
  padding-left: 10px;
  padding-right: 10px;

  &&:hover {
    background: #252424;
    transition: 0.5s;
  }
`;

const Button = styled.button`
  height: 50px;
  font-size: 1rem;
  font-weight: 600;
  color: #d8d6d6;
  background: none;
  border: none;
`;

const PictureOutlinedImage = styled(PictureOutlined)`
  font-size: 1.3rem;
  color: #d8d6d6;
`;

const FolderOutlinedImage = styled(FolderOutlined)`
  font-size: 1.3rem;
  color: #d8d6d6;
`;

const UploadImage = () => {
  const [image, setImage] = useState('');

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
  return (
    <Container onSubmit={uploadImage}>
      <ChooseImageInput
        type="file"
        id="img"
        onChange={e => setImage(e.target.files[0])}
      />
      <ChooseImage htmlFor="img">
        <MenuItem>
          <PictureOutlinedImage />
          <Button>Photo or Video</Button>
        </MenuItem>
        <MenuItem>
          <FolderOutlinedImage />
          <Button>Document</Button>
        </MenuItem>
      </ChooseImage>
    </Container>
  );
};

export default UploadImage;
