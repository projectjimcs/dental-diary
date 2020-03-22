import React from 'react';
import { 
  Container,
  Card,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  TextField,
  Button,
} from '@material-ui/core';

import '../../../css/home/login.css';
import '../../../css/common/base.css';

export default class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      
    };
  }

  handleAccountTypeChange() {

  }

  render() {
    return (
      <Container className='login-box'>
        <Card className='login-box-content'>
          <h2>Login Form</h2>
          <form autoComplete="off">
            <FormControl className='full-width'>
              <InputLabel id='account-type-select-label'>Account Type</InputLabel>
              <Select
                labelId='account-type-select-label'
                id="account-type-select"
                value={null}
                onChange={null}
              >
                <MenuItem value='member'>Member</MenuItem>
                <MenuItem value='admin'>Admin</MenuItem>
              </Select>
            </FormControl>
            <TextField
              className='full-width'
              id='username-field'
              label='Username'
            />
            <TextField
              className='full-width'
              id='password-field'
              label='Password'
              type='password'
              autoComplete='current-password'
            />
            <Button style={{marginTop: '20px'}}>SIGN IN</Button>
          </form>
        </Card>
      </Container>
    );
  }
}