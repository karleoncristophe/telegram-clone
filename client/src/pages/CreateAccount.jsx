import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { message } from 'antd';
import styled from 'styled-components';
import ImgLogo from '../assets/icons/telegramicon.svg';
import Lottie from 'react-lottie';
import * as location from '../assets/icons/1055-world-locations.json';
import api from '../services/api';

const Container = styled.div`
  display: flex;
  background: #212121;
  font-family: 'Hind Siliguri', sans-serif;
  overflow: hidden;
  height: 100%;
  width: 100%;
`;

const Scroll = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  background: #212121;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-weight: 500;
  font-family: 'Hind Siliguri', sans-serif;
  overflow-x: scroll;
  scroll-snap-type: y mandatory;

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
`;

const RecordContent = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  position: relative;
  width: 408px;
  border-radius: 5px;
  height: 100%;
  margin-top: 40px;

  @media (max-width: 600px) {
    width: 80vw;
    margin-top: 0px;
  }

  @media (max-height: 692px) {
    margin-top: 10px;
  }
`;

const Title = styled.h1`
  color: #ffff;

  @media (max-width: 600px) {
    text-align: center;
  }

  @media (max-width: 320px) {
    font-size: 1.6rem;
  }
`;

const SubTitle = styled.span`
  color: #6e6c6c;
  font-size: 1.1rem;
  text-align: center;
  @media (max-width: 600px) {
    text-align: center;
  }
  @media (max-width: 320px) {
    font-size: 1rem;
  }
`;

const ButtonContent = styled.div`
  height: 54px;
  display: flex;
  width: 100%;
  margin: 10px;
  border: 1px solid #2f2f2f;
  outline: none;
  background: #212121;
  border-radius: 10px;
  font-size: 0.9rem;

  @media (max-width: 320px) {
    height: 45px;
  }
`;

const Button = styled.button`
  height: 54px;
  width: 100%;
  border: none;
  color: #7837e0;
  transition: 0.5s;
  border-radius: 10px;
  background: none;
  font-weight: 500;

  &:hover {
    background: #843cf6;
    border-color: #843cf6;
    color: white;
  }

  @media (max-width: 320px) {
    height: 45px;
  }
`;

const ButtonContentLogIn = styled(Link)`
  height: 54px;
  width: 100%;
  margin: 10px 10px 10px 10px;
  outline: none;
  font-size: 0.9rem;
`;

const ButtonLogIn = styled.button`
  height: 54px;
  width: 100%;
  border: none;
  color: #7837e0;
  transition: 0.5s;
  border-radius: 10px;
  background: none;
  text-transform: uppercase;
  font-weight: 500;

  &:hover {
    background: #833cf632;
    border-color: #843cf6;
    color: white;
  }

  @media (max-width: 320px) {
    height: 45px;
  }
`;

const LogoContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Logo = styled.img`
  width: 200px;
  height: 200px;

  @media (max-width: 600px) {
    width: 150px;
    height: 150px;
  }
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const InputNameTitle = styled.span`
  display: flex;
  position: relative;
  margin-left: 8px;
  top: 12px;
  z-index: 1;
  width: 44px;

  background: #212121;
  font-size: 0.9rem;
  color: #6e6c6c;
  font-weight: 560;
  padding-left: 4px;
  padding-right: 4px;
`;

const InputUserNameTitle = styled.span`
  display: flex;
  position: relative;
  margin-left: 8px;
  top: 12px;
  z-index: 1;
  width: 77px;

  background: #212121;
  font-size: 0.9rem;
  color: #6e6c6c;
  font-weight: 560;
  padding-left: 4px;
  padding-right: 4px;
`;
const InputEmailTitle = styled.span`
  display: flex;
  position: relative;
  margin-left: 8px;
  top: 12px;
  z-index: 1;
  width: 42px;

  background: #212121;
  font-size: 0.9rem;
  color: #6e6c6c;
  font-weight: 560;
  padding-left: 4px;
  padding-right: 4px;
`;
const InputPasswordTitle = styled.span`
  display: flex;
  position: relative;
  margin-left: 8px;
  top: 12px;
  z-index: 1;
  width: 68px;

  background: #212121;
  font-size: 0.9rem;
  color: #6e6c6c;
  font-weight: 560;
  padding-left: 4px;
  padding-right: 4px;
`;
// const InputConfirmPasswordTitle = styled.span`
//    display: flex;
//    position: relative;
//    margin-left: 8px;
//    top: 12px;
//    z-index: 1;
//    width: 122px;
//    background: #212121;
//    font-size: 0.9rem;
//    color: #6e6c6c;
//    font-weight: 560;
//    padding-left: 4px;
//    padding-right: 4px;
// `;

const Input = styled.input`
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

  @media (max-width: 320px) {
    height: 45px;
  }

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

const defaultLocation = {
  loop: true,
  autoplay: true,
  animationData: location.default,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

const CreateAccount = ({ type, color }) => {
  // eslint-disable-next-line
  const [state, setState] = useState({});
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const submit = async () => {
    setLoading(true);

    const newUsers = { user: username };
    setUsers([...users, newUsers]);

    const body = {
      name: `${user}`,
      username: `${username}`,
      email: `${email}`,
      password: `${password}`,
    };

    const { data } = await api.post('/users', body);

    if (data.email) {
      message.info('Conta criada com sucesso.');
    }

    if (!data.email) {
      message.error(data.error);
    }

    history.push({
      pathname: '/',
      state: data,
    });

    setLoading(false);
  };

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
    return () => {
      setState({}); // update an unmounted component
    };
    // eslint-disable-next-line
  }, []);

  return (
    <Container>
      {loading ? (
        <Lottie options={defaultLocation} height={200} width={200} />
      ) : (
        <Scroll>
          <RecordContent>
            <LogoContent>
              <Logo src={ImgLogo} />
            </LogoContent>
            <Title>Create a free account</Title>
            <SubTitle>
              Create your account and enjoy a good conversation.
            </SubTitle>
            <InputContainer>
              <InputNameTitle>Name</InputNameTitle>
              <Input
                autoFocus
                type="text"
                value={user}
                placeholder="Choose a Name"
                onChange={e => setUser(e.target.value)}
              />
            </InputContainer>
            <InputContainer>
              <InputUserNameTitle>User Name</InputUserNameTitle>
              <Input
                type="text"
                value={username}
                placeholder="Choose a username"
                onChange={e => setUsername(e.target.value)}
              />
            </InputContainer>
            <InputContainer>
              <InputEmailTitle>Email</InputEmailTitle>
              <Input
                type="text"
                value={email}
                placeholder="Choose a email"
                onChange={e => setEmail(e.target.value)}
              />
            </InputContainer>{' '}
            <InputContainer>
              <InputPasswordTitle>Password</InputPasswordTitle>
              <Input
                type="password"
                name="password"
                autoComplete="on"
                value={password}
                placeholder="Choose a password"
                onChange={e => setPassword(e.target.value)}
              />
            </InputContainer>
            {/* <InputContainer>
               <InputConfirmPasswordTitle>
                  Confirm Password
               </InputConfirmPasswordTitle>
               <Input
                  type="text"
                  value={confirmPassword}
                  placeholder="Choose a nick name"
                  onChange={e => setConfirmPassword(e.target.value)}
               />
            </InputContainer> */}
            <ButtonContent>
              <Button type="submit" onClick={submit} disabled={user === ''}>
                Create Account
              </Button>
            </ButtonContent>
            <ButtonContentLogIn to="/">
              <ButtonLogIn>Come Back</ButtonLogIn>
            </ButtonContentLogIn>
          </RecordContent>
        </Scroll>
      )}
    </Container>
  );
};

export default CreateAccount;
