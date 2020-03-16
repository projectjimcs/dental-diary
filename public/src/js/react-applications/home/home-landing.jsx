import React from 'react';
import Login from './login.jsx';
import HomeContent from './home-content.jsx';
import { 
  Box,
  AppBar,
  MenuList,
  MenuItem,
} from '@material-ui/core';

import '../../../css/common/base.css';

export default class HomeLanding extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPage: 'home',
    }

    this.changePage = this.changePage.bind(this);
  }

  changePage(page) {
    const pageLowerCase = page.toLowerCase();

    this.setState({
      currentPage: pageLowerCase,
    });
  }

  render() {
    const pageDirector = {
      home: 'Login',
      login: 'Home',
    };

    const {
      currentPage
    } = this.state;

    return (
      <Box className="full-height">
        <AppBar position='sticky'>
          <MenuList className='navigation'>
            <MenuItem onClick={() => {this.changePage(pageDirector[currentPage])}}>{pageDirector[currentPage]}</MenuItem>
          </MenuList>
        </AppBar>
        {
          currentPage === 'home' ?
          <HomeContent/>
          :
          <Login/>
        }
      </Box>
    );
  }
}