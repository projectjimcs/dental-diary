import React from 'react';
import { 
  Container,
  Card,
} from '@material-ui/core';

import '../../../css/home/home.css';

export default class HomeContent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container className='home-content-container'>
        <Card className='home-content'>
          Hi Sonali
        </Card>
      </Container>
    );
  }
}