import styled from 'styled-components';
import Routes from './routes/Routes';

const Container = styled.div`
  font-weight: 500;
  font-family: 'Hind Siliguri', sans-serif;
  background: #181818;
`;

function App() {
  return (
    <Container>
      <Routes />
    </Container>
  );
}

export default App;
