import React from 'react';
import PropTypes from 'prop-types';
import {
  Tabs,
  Tab,
  Typography,
  Box,
} from '@material-ui/core';
import CreateCompanyPanel from './create-company-panel.jsx';

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

export default class CompanyEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentTab: 0,
    };

    this.handleTabChange = this.handleTabChange.bind(this);
  }

  handleTabChange(event, tabValue) {
    this.setState({
      currentTab: tabValue
    });
  }

  render() {
    const {
      currentTab,
    } = this.state;

    return (
      <div className='main-container'>
        <Tabs
          className='tab-container'
          orientation='vertical'
          value={currentTab}
          onChange={this.handleTabChange}
        >
          <Tab label='Create Company' {...a11yProps(0)}/>
          <Tab label="Edit Company" {...a11yProps(1)} />
        </Tabs>
        <TabPanel 
          className='tab-panel'
          value={currentTab} 
          index={0}
        >
          <CreateCompanyPanel/>
        </TabPanel>
        <TabPanel value={currentTab} index={1}>
          Edit Company
        </TabPanel>
      </div>
    );
  }
}