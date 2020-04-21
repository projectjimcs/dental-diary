import React from 'react';
import { 
  Container,
  Card,
} from '@material-ui/core';

import '../../../css/user-dashboard/appointment-modal.css';

export default class AppointmentCreationModal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (

        <Card className='modal-content'>
          Hi Patient
        </Card>

    );
  }
}