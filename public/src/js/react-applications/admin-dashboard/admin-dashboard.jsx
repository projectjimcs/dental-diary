import React from 'react';
import { 
  Box,
  AppBar,
  MenuList,
  MenuItem,
} from '@material-ui/core';
import CompanyEditor from './company/company-editor.jsx';
import UserEditor from './user/user-editor.jsx';
import PatientEditor from './patient/patient-editor.jsx';
import AppointmentEditor from './appointment/appointment-editor.jsx';

import '../../../css/common/base.css';

export default class AdminDashboard extends React.Component {
  constructor(props) {
    super(props);

    this.pageDirectory = {
      companies: () => {
        return <CompanyEditor/>
      },
      users: () => {
        return <UserEditor/>
      },
      patients: () => {
        return <PatientEditor/>
      },
      appointments: () => {
        return <AppointmentEditor/>
      },
    };

    this.state = {
      currentPage: 'companies',
    };

    this.changePage = this.changePage.bind(this);
  }

  changePage(page) {
    this.setState({
      currentPage: page,
    });
  }

  render() {
    const {
      currentPage,
    } = this.state;

    return (
      <Box className="full-height">
        <AppBar position='absolute'>
          <MenuList className='navigation'>
            <MenuItem 
              onClick={() => this.changePage('appointments')}
              selected={currentPage === 'appointments'}
            >
              Appointments
            </MenuItem>
            <MenuItem 
              onClick={() => this.changePage('patients')}
              selected={currentPage === 'patients'}
            >
              Patients
            </MenuItem>
            <MenuItem 
              onClick={() => this.changePage('users')}
              selected={currentPage === 'users'}
            >
              Users
            </MenuItem>
            <MenuItem 
              onClick={() => this.changePage('companies')}
              selected={currentPage === 'companies'}
            >
              Companies
            </MenuItem>
          </MenuList>
        </AppBar>
        {
          this.pageDirectory[currentPage]()
        }
      </Box>
    );
  }
}