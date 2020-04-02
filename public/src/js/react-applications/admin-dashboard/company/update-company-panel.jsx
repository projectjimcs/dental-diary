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

import '../../../../css/admin-dashboard/dashboard.css';

export default class UpdateCompanyPanel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      companies: [],
      companyUuid: '',
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
    this.handleCompanySelection = this.handleCompanySelection.bind(this);
  }

  componentDidMount() {
    fetch('/api/company', {credentials: 'include'})
      .then(response => response.json())
      .then((companies) => {
        this.setState({
          companies
        });
      })
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

  handleCompanySelection(event) {
    const { companies } = this.state;
    const companyUuid = event.target.value;

    const selectedCompany = companies.find(company => company.uuid === companyUuid);
    console.log(selectedCompany)
    this.setState({
      companyUuid: selectedCompany.uuid,
      companyName: selectedCompany.name,
      companyEmail: selectedCompany.email || '',
      companyPhone: selectedCompany.phone || '',
      companyAddress: selectedCompany.address || '',
      companyTimezone: selectedCompany.timezone,
    });    
  }

  handleFormSubmit(event) {
    event.preventDefault();

    const {
      companyUuid,
      companyName,
      companyEmail,
      companyPhone,
      companyAddress,
      companyTimezone,
    } = this.state;

    const errorMessages = {
      companyEmail: 'Please enter a valid email address',
      companyPhone: 'Please enter a valid phone number',
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
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      };
      
      fetch(`/api/company/${companyUuid}/update`, options)
        .then(() => {
          console.log('Success');
        })
    }
  }

  render() {
    const {
      companies,
      companyUuid,
      companyName,
      companyEmail,
      companyPhone,
      companyAddress,
      errorText,
      companyTimezone
    } = this.state;

    const { timezones } = this.props;

    const companySelectItem = companies.map((company, index) => {
      return <MenuItem key={index} value={company.uuid}>{company.name}</MenuItem>
    });

    return (
      <Card className='panel-mid-container'>
        <div className='panel-mid-content'>
          <span>UPDATE COMPANY</span>
          <form onSubmit={this.handleFormSubmit} id='create-company-form'>
            <div className='panel-mid-row'>
              <FormControl className='company-form-field company-select-field'>
                <InputLabel id='company-select-label'>Select Company</InputLabel>
                <Select
                  name='company'
                  labelId='company-select-label'
                  id="company-select"
                  value={companyUuid}
                  onChange={this.handleCompanySelection}
                >
                  {companySelectItem}
                </Select>
                <FormHelperText
                >
                </FormHelperText>
              </FormControl>
            </div>
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
                options={timezones}
                value={companyTimezone}
                onChange={this.handleTimezoneSelection}
                renderInput={(params) => 
                  <TextField
                    {...params}
                    label='Timezone'
                    required
                  />
                }
              />
            </div>
            <Button type='submit' className='create-company-button'>Update</Button>
          </form>
        </div>
      </Card>
    );
  }
}

UpdateCompanyPanel.propTypes = {
  timezones: PropTypes.array.isRequired,
};