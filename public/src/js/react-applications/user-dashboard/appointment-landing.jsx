import React from 'react';
import { 
  Container,
  Card,
} from '@material-ui/core';

import '../../../css/user-dashboard/base.css';

export default class AppointmentLanding extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container className='mid-container'>
        <Card className='mid-content'>
          Hi Appointment
        </Card>
      </Container>
    );
  }
}