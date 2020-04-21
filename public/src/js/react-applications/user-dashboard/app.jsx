import React from 'react';
import ReactDOM from 'react-dom';
import UserDashboard from './user-dashboard.jsx';

import 'typeface-roboto';

const element = document.querySelector('#app');

const props = {
  companyUuid: element.dataset.companyUuid,
}

ReactDOM.render(
  <UserDashboard {...props} />, element
);
