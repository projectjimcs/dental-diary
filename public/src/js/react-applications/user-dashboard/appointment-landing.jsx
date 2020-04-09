import React from 'react';
import { 
  Container,
  Card,
  Button,
  Select,
} from '@material-ui/core';

import Calendar from '@toast-ui/react-calendar';
import 'tui-calendar/dist/tui-calendar.css';

import '../../../css/user-dashboard/base.css';
import '../../../css/user-dashboard/dashboard.css';

export default class AppointmentLanding extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div class='appointment-main-container'>
        <div className='appointment-side-content'>
          hi there something
        </div>
        <Card className='calendar-container'>
          <div className='calendar-toolbar'>
            <Button>Next</Button>
            <Button>Prev</Button>
            <Button>Today</Button>
          </div>
          <Calendar
            view='month'
          />
        </Card>
      </div>
    );
  }
}