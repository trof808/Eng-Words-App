import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import BottomNavigation from '@material-ui/core/BottomNavigation';

import Home from '@material-ui/icons/Home';
import AddCircleOutline from '@material-ui/icons/AddCircleOutline';

const Container = styled.div`
  position: fixed;
  width: 100%;
  bottom: 0;
`;

const BottomNavigationComponent = ({ history, location }) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const {pathname} = location;
    if (pathname === '/add-new') {
      setValue(1);
    }
    if (pathname === '/') {
      setValue(0);
    }
  }, [location]);

  const onChangePage = (event, value) => {
    if (value === 0) {
      history.push('/');
    }
    if (value === 1) {
      history.push('/add-new');
    }

    setValue(value);
  }

  return (
    <Container>
      <BottomNavigation
        value={value}
        onChange={onChangePage}
        showLabels
      >
        <BottomNavigationAction label="Главная" icon={<Home />} />
        <BottomNavigationAction label="Добавить слово" icon={<AddCircleOutline />} />
      </BottomNavigation>
    </Container>
  )
}

export default withRouter(BottomNavigationComponent);
