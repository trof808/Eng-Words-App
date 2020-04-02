import React from 'react';
import { Switch, Route } from 'react-router-dom';

import App from './components/app';
import AddWordForm from './components/add-word-form';
import BottomNavigationComponent from './components/bottom-navigation';

import * as Styled from './global.styles';

const Routes = () => {

  return (
    <>
      <Styled.GlobalContainer />
      <Styled.AppContainer>
        <Switch>
          <Route path="/add-new" component={AddWordForm} />
          <Route path="/" component={App} />
        </Switch>
      </Styled.AppContainer>
      <BottomNavigationComponent />
    </>
  )
}

export default Routes;
