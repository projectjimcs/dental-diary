import React from 'react';
import { 
  Container,
  Grid,
  Paper,
} from '@material-ui/core';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container>
        <Grid container>
          <Grid item xs={12}>
            <Paper elevation={3}>
              Login Page
            </Paper>
          </Grid>
        </Grid>
      </Container>
    );
  }
}