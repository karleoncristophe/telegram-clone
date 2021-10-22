import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { SearchOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import api from '../../services/api';
import UserImage from '../../assets/icons/user.png';
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

const Head = styled.header`
  display: flex;
  justify-content: center;
  height: 56px;
  width: 100%;
`;

const OptionsAndSearch = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
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

const ProfileAvatar = styled.div`
  width: 75px;
  height: 60px;
  background-size: cover;
  background-image: url(${UserImage});
  border-radius: 50%;
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

const SearchChat = ({ closeSearch, openChat }) => {
  const [users, setUsers] = useState([]);
  const [searchUsers, setSearchUsers] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);

  const onChange = e => {
    setSearchUsers(e.target.value);
  };

  useEffect(() => {
    setFilteredUsers(
      users.filter(get => {
        return (
          get.name.toLowerCase().includes(searchUsers.toLocaleLowerCase()) ||
          get.username.toLowerCase().includes(searchUsers.toLocaleLowerCase())
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
            <LeftArowImage />
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
              <ChatMenuButton
                key={item.id + index.toString()}
                onClick={openChat}
              >
                <ProfileAvatar />

                <ProfileInformation>
                  <Name>{item.name}</Name>
                  <NickName>{item.username}</NickName>
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
