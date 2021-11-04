import styled from 'styled-components';
import { useState, useEffect } from 'react';

import { Link, useHistory } from 'react-router-dom';

import { message } from 'antd';

import ImgLogo from '../assets/icons/telegramicon.svg';

import api from '../services/api';

const Container = styled.div`
  display: flex;
  background: #212121;
  font-family: 'Hind Siliguri', sans-serif;
  overflow-y: hidden;
  height: 100%;
  width: 100%;
`;

const Scroll = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-weight: 500;
  font-family: 'Hind Siliguri', sans-serif;
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
    margin-top: 20px;
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

const ButtonContentLogIn = styled.div`
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

const ButtonLogIn = styled.button`
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

const ButtonContentCreateAccount = styled(Link)`
  height: 54px;
  width: 100%;
  margin: 10px 10px 10px 10px;
  outline: none;
  font-size: 0.9rem;
`;

const ButtonCreateAccount = styled.button`
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

const InputContainer = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const InputEmailitle = styled.span`
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

const LogIn = () => {
  // eslint-disable-next-line
  const [state, setState] = useState({});
  // eslint-disable-next-line
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const clear = () => {
    setEmail('');
    setPassword('');
  };

  const submit = async () => {
    const body = {
      email,
      password,
    };

    try {
      const { data } = await api.post('/login', body);
      if (!!data.error) {
        message.error(data.error);
      }

      history.push({
        pathname: '/app',
      });
      localStorage.setItem('@telegram.token', data.token);
    } catch (e) {
      console.log(e);
    }

    clear();
  };

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const reponse = await fetch('http://localhost:4000/users');
        const data = await reponse.json();
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
      <Scroll>
        <RecordContent>
          <LogoContent>
            <Logo src={ImgLogo} />
          </LogoContent>
          <Title>Log In Telegram</Title>
          <SubTitle>Write your information to join the community.</SubTitle>

          <InputContainer>
            <InputEmailitle>Email</InputEmailitle>
            <Input
              autoFocus
              type="text "
              value={email}
              placeholder="Write your email"
              onChange={e => setEmail(e.target.value)}
            />
          </InputContainer>
          <InputContainer>
            <InputPasswordTitle>Password</InputPasswordTitle>

            <Input
              type="password"
              name="password"
              autoComplete="on"
              value={password}
              placeholder="Write your password"
              onChange={e => setPassword(e.target.value)}
            />
          </InputContainer>
          <ButtonContentLogIn>
            <ButtonLogIn onClick={submit} disabled={email === ''}>
              Log In
            </ButtonLogIn>
          </ButtonContentLogIn>
          <ButtonContentCreateAccount to="/createAccount">
            <ButtonCreateAccount>
              Already registered? Create account
            </ButtonCreateAccount>
          </ButtonContentCreateAccount>
        </RecordContent>
      </Scroll>
    </Container>
  );
};

export default LogIn;
