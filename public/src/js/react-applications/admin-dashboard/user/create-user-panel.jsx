import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  TextField,
  FormControl,
  FormHelperText,
  MenuItem,
  InputLabel,
  Select,
  Button,
} from '@material-ui/core';

import '../../../../css/admin-dashboard/dashboard.css';

export default class CreateUserPanel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      companyUuid: '',
      email: '',
      phone: '',
      address: '',
      password: '',
      selectedRoles: [],
      accountTypeKey: '',
      errorText: {},
    };

    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  emailIsValid(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailRegex.test(email);
  }

  phoneIsValid(phoneNumber) {
    const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

    return phoneRegex.test(phoneNumber);
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
      firstName,
      lastName,
      companyUuid,
      email,
      phone,
      address,
      password,
      selectedRoles,
      accountTypeKey,
    } = this.state;

    // Need to refactor error messages, dumb way of doing things
    const errorMessages = {
      email: 'Please enter a valid email address',
      phone: 'Please enter a valid phone number',
      accountType: 'Please select an account type',
      role: 'A role must be selected for the user',
      company: 'A company must be selected',
    }; 

    const errors = {};

    if (email && !this.emailIsValid(email)) {
      errors['email'] = errorMessages['email'];
    } else {
      delete errors.email;
    }

    if (phone && !this.phoneIsValid(phone)) {
      errors['phone'] = errorMessages['phone'];
    } else {
      delete errors.phone;
    }

    if (companyUuid) {
      delete errors.companyUuid;
    } else {
      errors['company'] = errorMessages['company'];
    }

    if (selectedRoles.length) {
      delete errors.role;
    } else{
      errors['role'] = errorMessages['role'];
    }

    this.setState({
      errorText: {
        ...errors,
      }
    });

    if (Object.keys(errors).length) {
     return; 
    } else {
      const data = {
        firstName,
        lastName,
        companyUuid,
        email,
        phone,
        address,
        password,
        selectedRoles,
        accountTypeKey,
      }

      const options = {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      };

      fetch('/api/user/create', options)
        .then(() => {
          console.log('Success');
        })
    }
  }

  render() {
    const {
      firstName,
      lastName,
      companyUuid,
      email,
      phone,
      address,
      selectedRoles,
      accountTypeKey,
      password,
      errorText,
    } = this.state;

    const {
      companies,
      accountTypes,
      roles,
    } = this.props;

    const companySelectItems = companies.map((company, index) => {
      return <MenuItem key={index} value={company.uuid}>{company.name}</MenuItem>
    });

    const accountTypeSelectItems = accountTypes.map((accountType, index) => {
      return <MenuItem key={index} value={accountType.key}>{accountType.name}</MenuItem>
    });

    const roleSelectItems = roles.map((role, index) => {
      return <MenuItem key={index} value={role.id}>{role.name}</MenuItem>
    })

    return (
      <Card className='panel-mid-container'>
        <div className='panel-mid-content'>
          <span>USER CREATION</span>
          <form onSubmit={this.handleFormSubmit} id='create-user-form'>
            <div className='panel-mid-row'>
              <FormControl className='user-form-field selection-field'>
                <InputLabel id='user-company-select-label'>Select Company</InputLabel>
                <Select
                  name='companyUuid'
                  labelId='user-company-select-label'
                  id="user-company-select"
                  value={companyUuid}
                  onChange={this.handleFormChange}
                >
                  {companySelectItems}
                </Select>
                <FormHelperText
                >
                </FormHelperText>
              </FormControl>
              <FormControl className='user-form-field selection-field'>
                <InputLabel id='user-type-select-label'>Account Type</InputLabel>
                <Select
                  name='accountTypeKey'
                  labelId='user-type-select-label'
                  id="user-type-select"
                  value={accountTypeKey}
                  onChange={this.handleFormChange}
                >
                  {accountTypeSelectItems}
                </Select>
                <FormHelperText
                >
                </FormHelperText>
              </FormControl>
              <FormControl className='user-form-field role-selection-field'>
                <InputLabel id='user-role-select-label'>Role</InputLabel>
                <Select
                  multiple
                  name='selectedRoles'
                  labelId='user-role-select-label'
                  id="user-role-select"
                  value={selectedRoles}
                  onChange={this.handleFormChange}
                >
                  {roleSelectItems}
                </Select>
                <FormHelperText
                >
                </FormHelperText>
              </FormControl>
            </div>
            <div className='panel-mid-row'>
              <TextField
                className='user-form-field'
                name='firstName'
                label='First Name'
                required
                value={firstName}
                onChange={this.handleFormChange}
              />
              <TextField
                className='user-form-field'
                name='lastName'
                label='Last Name'
                required
                value={lastName}
                onChange={this.handleFormChange}
              />
              <TextField
                className='user-form-field'
                name='password'
                label='Password'
                required
                type='password'
                value={password}
                onChange={this.handleFormChange}
              />
            </div>
            <div className='panel-mid-row'>
              <TextField
                className='user-form-field'
                name='email'
                label='Email'
                error={errorText['email'] ? true : false}
                helperText={errorText['email']}
                value={email}
                onChange={this.handleFormChange}
              />
              <TextField
                className='user-form-field'
                name='phone'
                label='Phone'
                error={errorText['phone'] ? true : false}
                helperText={errorText['phone']}
                value={phone}
                onChange={this.handleFormChange}
              />
              <TextField
                className='user-form-field'
                name='address'
                label='Address'
                value={address}
                onChange={this.handleFormChange}
              />
            </div>
            <Button type='submit' className='create-user-button'>Create</Button>
          </form>
        </div>
      </Card>
    );
  }
}

CreateUserPanel.propTypes = {
  companies: PropTypes.array.isRequired,
  roles: PropTypes.array.isRequired,
  accountTypes: PropTypes.array.isRequired,
};