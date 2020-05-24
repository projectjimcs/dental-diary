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
import Autocomplete from '@material-ui/lab/Autocomplete';

// import '../../../../css/admin-dashboard/base.css';
import '../../../../css/admin-dashboard/dashboard.css';

export default class CreateCompanyPanel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      companyName: '',
      companyEmail: '',
      companyPhone: '',
      companyAddress: '',
      companyTimezone: '',
      errorText: {},
    };

    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleTimezoneSelection = this.handleTimezoneSelection.bind(this);
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

  handleTimezoneSelection(event, selectedTimezone) {
    this.setState({
      companyTimezone: selectedTimezone,
    })
  }

  handleFormSubmit(event) {
    event.preventDefault();

    const {
      companyName,
      companyEmail,
      companyPhone,
      companyAddress,
      companyTimezone,
    } = this.state;

    const errorMessages = {
      companyEmail: 'Please enter a valid email address',
      companyPhone: 'Please enter a valid phone number',
      // companyTimezone: 'Please select a timezone',
    }; 

    const errors = {};

    if (companyEmail && !this.emailIsValid(companyEmail)) {
      errors['companyEmail'] = errorMessages['companyEmail'];
    } else {
      delete errors.companyEmail;
    }

    if (companyPhone && !this.phoneIsValid(companyPhone)) {
      errors['companyPhone'] = errorMessages['companyPhone'];
    } else {
      delete errors.companyPhone;
    }

    // if (companyTimezone) {
    //   delete errors.companyTimezone;
    // } else {
    //   errors['companyTimezone'] = errorMessages['companyTimezone'];
    // }

    this.setState({
      errorText: {
        ...errors,
      }
    });

    if (Object.keys(errors).length) {
     return; 
    } else {
      const data = {
        companyName,
        companyEmail,
        companyPhone,
        companyAddress,
        companyTimezone,
      }

      const options = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      };

      fetch('/api/company/create', options)
        .then(() => {
          console.log('Success');
        })
    }
  }

  render() {
    const {
      companyName,
      companyEmail,
      companyPhone,
      companyAddress,
      errorText,
    } = this.state;

    const { timezones } = this.props;

    return (
      <Card className='panel-mid-container'>
        <div className='panel-mid-content'>
          <span>COMPANY CREATION</span>
          <form onSubmit={this.handleFormSubmit} id='create-company-form'>
            <div className='panel-mid-row'>
              <TextField
                className='company-form-field'
                name='companyName'
                label='Company Name'
                required
                value={companyName}
                onChange={this.handleFormChange}
              />
              <TextField
                className='company-form-field'
                name='companyEmail'
                label='Email'
                error={errorText['companyEmail'] ? true : false}
                helperText={errorText['companyEmail']}
                value={companyEmail}
                onChange={this.handleFormChange}
              />
              <TextField
                className='company-form-field phone-field'
                name='companyPhone'
                label='Phone'
                error={errorText['companyPhone'] ? true : false}
                helperText={errorText['companyPhone']}
                value={companyPhone}
                onChange={this.handleFormChange}
              />
            </div>
            <div className='panel-mid-row'>
              <TextField
                className='company-form-field'
                name='companyAddress'
                label='Address'
                value={companyAddress}
                onChange={this.handleFormChange}
              />
              <Autocomplete
                className='company-form-field timezone-field'
                id='timezone-select-label'
                name='companyTimezone'
                autoHighlight
                // value={companyTimezone}
                options={timezones}
                onChange={this.handleTimezoneSelection}
                renderInput={(params) => 
                  <TextField
                    {...params}
                    label='Timezone'
                    required
                    // name='companyTimezone'
                    // label='Timezone'
                    // value={companyTimezone}
                    // onChange={this.handleFormChange}
                  />
                }
              />
              {/*<FormControl className='company-form-field timezone-field'>
                <InputLabel id='timezone-select-label'>Timezone *</InputLabel>
                <Select
                  autoComplete
                  name='companyTimezone'
                  labelId='timezone-select-label'
                  id="timezone-select"
                  value={companyTimezone}
                  onChange={this.handleFormChange}
                >
                  <MenuItem value='kenya'>Kenya</MenuItem>
                  <MenuItem value='china'>China</MenuItem>
                </Select>
                <FormHelperText
                  error={errorText['companyTimezone'] ? true : false}
                >
                  {errorText['companyTimezone'] || ''}
                </FormHelperText>
    </FormControl>*/}
            </div>
            <Button type='submit' className='create-company-button'>Create</Button>
          </form>
        </div>
      </Card>
    );
  }
}

CreateCompanyPanel.propTypes = {
  timezones: PropTypes.array.isRequired,
};