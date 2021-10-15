import styled from 'styled-components';
import { useState, useEffect } from 'react';
import LeftArrowImg from '../../assets/icons/left-arrow.png';
import { Avatar } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import api from '../../services/api';
// import SearchPurpleImg from '../assets/icons/searchpurple.svg';

const Container = styled.div`
  background: #212121;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;

  @media (max-width: 1202px) {
    width: 14rem;
    height: 100%;
    width: 100%;
  }
`;

const LeftArowButton = styled.button`
  border-radius: 50%;
  border: none;
  width: 42px;
  height: 42px;
  background: none;
  margin-right: 5px;

  &:hover {
    background: #383737;
    transition: 1s;
  }
`;

const LeftArowImage = styled.img`
  height: 20px;
`;

const Head = styled.header`
  display: flex;
  justify-content: center;
  height: 56px;
  width: 100%;
`;

const OptionsAndSearch = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  @media (max-width: 1202px) {
    padding: 10px;
  }
`;

const SearchButton = styled.button`
  display: flex;
  align-items: center;
  border-radius: 20px;
  border: 2px solid #8774e1;
  background: #181818;
  height: 42px;
  width: 80%;

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

  &&::placeholder {
    color: #707579;

    &:hover {
      color: #8774e1;
    }
    &:focus {
      color: #8774e1;
    }
  }
`;

const MainProfileContent = styled.main`
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
    width: 96%;
  }

  &:hover {
    background: #292929;
  }

  &:focus {
    background: #8774e1;
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

const Name = styled.span`
  font-size: 1.1rem;
  font-weight: 600;
  color: #ffff;
`;

const NickName = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 1rem;
  font-weight: 550;
  color: #6e6c6c;
`;

const SearchChat = ({ closeSearch }) => {
  const [users, setUsers] = useState([]);
  const [searchUsers, setSearchUsers] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);

  const ChatImage =
    'https://t3.ftcdn.net/jpg/03/02/41/08/240_F_302410851_oPS6nnVa0e2bexWL9vVR85kcha5uLkuz.jpg';

  const onChange = e => {
    setSearchUsers(e.target.value);
  };

  useEffect(() => {
    setFilteredUsers(
      users.filter(get => {
        return (
          get.name.toLowerCase().includes(searchUsers.toLocaleLowerCase()) ||
          `@${get.username}`
            .toLowerCase()
            .includes(searchUsers.toLocaleLowerCase())
        );
      })
    );
  }, [searchUsers, users]);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const { data } = await api.get('users');
        setUsers(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRepos();
    // eslint-disable-next-line
  }, []);

  return (
    <Container>
      <Head>
        <OptionsAndSearch>
          <LeftArowButton onClick={closeSearch}>
            <LeftArowImage src={LeftArrowImg} />
          </LeftArowButton>

          <SearchButton>
            <ImageSearchContent>
              <ImageSearch />
            </ImageSearchContent>
            <SearchInput autoFocus onChange={onChange} placeholder="Search" />
          </SearchButton>
        </OptionsAndSearch>
      </Head>
      <MainProfileContent>
        {searchUsers.length !== 0 && (
          <>
            {filteredUsers.map((item, index) => (
              <ChatMenuButton key={item.id + index.toString()}>
                <ProfileAvatar
                  size={52}
                  style={{ width: '64px' }}
                  src={ChatImage}
                />

                <ProfileInformation>
                  <Name>{item.name}</Name>
                  <NickName>@{item.username}</NickName>
                </ProfileInformation>
              </ChatMenuButton>
            ))}
          </>
        )}
      </MainProfileContent>
    </Container>
  );
};

export default SearchChat;
