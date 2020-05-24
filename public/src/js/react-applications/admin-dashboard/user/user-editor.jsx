import React from 'react';
import PropTypes from 'prop-types';
import {
  Tabs,
  Tab,
  Typography,
  Box,
} from '@material-ui/core';

import CreateUserPanel from './create-user-panel.jsx';

import '../../../../css/admin-dashboard/dashboard.css';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default class UserEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentTab: 0,
      companies: [],
      accountTypes: [],
      roles: [],
    };

    this.handleTabChange = this.handleTabChange.bind(this);
    this.initializeData = this.initializeData.bind(this);
  }

  componentDidMount() {
    this.initializeData();
  }

  initializeData() {
    let apiCalls = [
      fetch('/api/company').then(response => response.json()),
      fetch('/api/account/types').then(response => response.json()),
      fetch('/api/account/roles').then(response => response.json()),
    ];

    Promise.all(apiCalls)
      .then(([companies, accountTypes, roles]) => {
        this.setState({
          companies,
          accountTypes,
          roles,
        });
      });
  }

  handleTabChange(event, tabValue) {
    this.setState({
      currentTab: tabValue
    });
  }

  render() {
    const {
      currentTab,
      companies,
      accountTypes,
      roles,
    } = this.state;

    return (
      <div className='main-container'>
        <Tabs
          className='tab-container'
          orientation='vertical'
          value={currentTab}
          onChange={this.handleTabChange}
        >
          <Tab label='Create User' {...a11yProps(0)}/>
          <Tab label="Edit User" {...a11yProps(1)} />
        </Tabs>
        <TabPanel 
          className='tab-panel'
          value={currentTab} 
          index={0}
        >
          <CreateUserPanel 
            companies={companies} 
            accountTypes={accountTypes}
            roles={roles}
          />
        </TabPanel>
        <TabPanel 
          className='tab-panel'
          value={currentTab} 
          index={1}
        >
          Hi edit
        </TabPanel>
      </div>
    );
  }
}