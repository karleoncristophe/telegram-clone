// import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';

import LogIn from '../pages/LogIn';
import CreateAccount from '../pages/CreateAccount';
import HomePage from '../pages/HomePage';

// const Container = styled.div``;

function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <LogIn />
      </Route>
      <Route path="/createAccount">
        <CreateAccount />
      </Route>
      <Route path="/app">
        <HomePage />
      </Route>
    </Switch>
  );
}

export default Routes;
