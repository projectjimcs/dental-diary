import React from 'react';
import { 
  Box,
  AppBar,
  MenuList,
  MenuItem,
} from '@material-ui/core';
// import CompanyEditor from './company/company-editor.jsx';
// import UserEditor from './user/user-editor.jsx';
// import PatientEditor from './patient/patient-editor.jsx';
import AppointmentLanding from './appointment-landing.jsx';
import PatientLanding from './patient-landing.jsx';

import '../../../css/common/base.css';

export default class UserDashboard extends React.Component {
  constructor(props) {
    super(props);

    this.pageDirectory = {
      patients: () => {
        return <PatientLanding/>
      },
      appointments: () => {
        return <AppointmentLanding/>
      },
    };

    this.state = {
      currentPage: 'appointments',
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
      <Box className='full-height'>
        <AppBar position='absolute'>
          <MenuList className='navigation'>
            <MenuItem 
              onClick={() => this.changePage('patients')}
              selected={currentPage === 'patients'}
            >
              Patients
            </MenuItem>
            <MenuItem 
              onClick={() => this.changePage('appointments')}
              selected={currentPage === 'appointments'}
            >
              Appointments
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