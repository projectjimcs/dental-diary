import React from 'react';
import { 
  Container,
  Card,
} from '@material-ui/core';

import '../../../../css/admin-dashboard/base.css';

export default class PatientEditor extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container className='mid-container'>
        <Card className='mid-content'>
          Hi Patient
        </Card>
      </Container>
    );
  }
}