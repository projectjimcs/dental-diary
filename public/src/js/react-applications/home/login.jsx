import React from 'react';
import { 
  Container,
  Card,
  FormControl,
  FormHelperText,
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
      accountType: '',
      email: '', 
      password: '',
      errorText: {
        email: '',
        password: '',
        // accountType: '',
      },
    };

    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.emailIsValid = this.emailIsValid.bind(this);
  }

  handleFormChange(event) {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      [name]: value,
    });
  }

  handleFormSubmit(event) {
    event.preventDefault();
    
    const {
      email,
      password,
      accountType,
    } = this.state;
    console.log(email)
    console.log(password)
    const emailErrorMessage = 'Please enter a valid email address';
    const passwordErrorMessage = 'A password is required';

    const errors = {};

    errors['email'] = this.emailIsValid(email) ? '' : emailErrorMessage;
    errors['password'] = password === '' ? passwordErrorMessage : '';
    // errors['accountType'] = accountType === '' ? accountTypeErrorMessage : '';

    this.setState({
      errorText: {
        ...errors,
      }
    })

    // Bad way of doing things, refactor later
    if (errors['email'] || errors['password']) {
      return;
    };

    const data = {
      email,
      password,
      // accountType,
    };
    
    const options = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    
    fetch('/login', options)
    .then((response) => response.json())
    .then((jwtToken) => {
      const tokenParts = jwtToken.split('.');
      const userData = JSON.parse(atob(tokenParts[1]));
      console.log(userData)
      const accountType = userData.accountType;

      if (accountType === 'superadmin') {
        window.location.replace('/admin-dashboard');
      } else {
        window.location.replace('/dashboard');
      }
    })
    .catch((error) => {
      console.log('Error:', error);
    });
  }

  emailIsValid(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailRegex.test(email);
  }

  render() {
    const {
      // accountType,
      email,
      password,
      errorText,
    } = this.state;

    return (
      <Container className='login-box'>
        <Card className='login-box-content'>
          <h2>Login Form</h2>
          <form onSubmit={this.handleFormSubmit}>
            {/*<FormControl className='full-width'>
              <InputLabel id='account-type-select-label'>Account Type</InputLabel>
              <Select
                name='accountType'
                labelId='account-type-select-label'
                id="account-type-select"
                value={accountType}
                onChange={this.handleFormChange}
              >
                <MenuItem value='member'>Member</MenuItem>
                <MenuItem value='admin'>Administrator</MenuItem>
              </Select>
              <FormHelperText
                error={errorText['accountType'] ? true : false}
              >
                {errorText['accountType'] || ''}
              </FormHelperText>
            </FormControl>*/}
            <TextField
              name='email'
              className='full-width'
              id='email-field'
              label='Email'
              error={errorText['email'] ? true : false}
              helperText={errorText['email']}
              value={email}
              onChange={this.handleFormChange}
            />
            <TextField
              name='password'
              className='full-width'
              id='password-field'
              label='Password'
              type='password'
              autoComplete='current-password'
              error={errorText['password'] ? true : false}
              helperText={errorText['password']}
              value={password}
              onChange={this.handleFormChange}
            />
            <Button type='submit' style={{marginTop: '20px'}}>SIGN IN</Button>
          </form>
        </Card>
      </Container>
    );
  }
}