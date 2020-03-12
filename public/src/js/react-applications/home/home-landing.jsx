import React from 'react';
import { 
  Container,
  AppBar,
  MenuList,
  MenuItem,
} from '@material-ui/core';

import '../../../css/home-landing.css';

export default class HomeLanding extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container maxWidth="lg">
        <AppBar>
          <MenuList className='main-menu'>
            <MenuItem>Member Login</MenuItem>
            <MenuItem>Admin Login</MenuItem>
          </MenuList>
        </AppBar>
      </Container>
    );
  }
}