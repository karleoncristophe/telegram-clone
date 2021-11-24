import { useState } from 'react';
import styled from 'styled-components';

const PersonDataContent = styled.footer`
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
`;
const PersonDataHead = styled.div`
  width: 100%;
  height: 56px;
`;

const PersonDataButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 100%;
  width: 100%;
`;
const Button = styled.button`
  color: #6a52da;
  font-size: 1rem;
  font-weight: 600;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  background: none;
  &:hover {
    background: #383737;
  }
`;

const PersonDataImageContent = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

const MediaContent = styled.div`
  display: flex;
  width: 100%;
  background: none;
`;

const CardContent = styled.div`
  display: flex;
  background: red;
  width: 100%;
  flex-wrap: wrap;
`;

const Card = styled.div`
  background: blue;
  width: 141px;
  height: 141px;
  border: 1px solid black;
  @media (max-width: 1202px) {
    width: 139px;
    height: 139px;
  }
`;

const Cards = () => {
  const [active, setActive] = useState('FirstCard');
  return (
    <PersonDataContent>
      <PersonDataHead>
        <PersonDataButton>
          <Button onClick={() => setActive('FirstCard')}>Media</Button>

          <Button onClick={() => setActive('SecondCard')}>Files</Button>

          <Button onClick={() => setActive('ThirdCard')}>Links</Button>

          <Button onClick={() => setActive('FourthCard')}>Voice</Button>
        </PersonDataButton>
      </PersonDataHead>

      <PersonDataImageContent>
        {active === 'FirstCard' && (
          <MediaContent>
            <CardContent>
              <Card>Media</Card>
              <Card>Media</Card>
              <Card>Media</Card>
              <Card>Media</Card>
            </CardContent>
          </MediaContent>
        )}
        {active === 'SecondCard' && (
          <MediaContent>
            <Card>Files</Card>
          </MediaContent>
        )}
        {active === 'ThirdCard' && (
          <MediaContent>
            <Card>Links</Card>
          </MediaContent>
        )}
        {active === 'FourthCard' && (
          <MediaContent>
            <Card>Voice</Card>
          </MediaContent>
        )}
      </PersonDataImageContent>
    </PersonDataContent>
  );
};

export default Cards;
