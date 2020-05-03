import React from 'react';
import { 
  Container,
  Card,
  Button,
  Select,
  Modal,
} from '@material-ui/core';
import moment from 'moment';

import Calendar from '@toast-ui/react-calendar';
import 'tui-calendar/dist/tui-calendar.css';
import 'tui-date-picker/dist/tui-date-picker.css';
import 'tui-time-picker/dist/tui-time-picker.css';

import '../../../css/user-dashboard/base.css';
import '../../../css/user-dashboard/dashboard.css';

import AppointmentCreationModal from './appointment-creation-modal.jsx';

export default class AppointmentLanding extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      calendarView: 'month',
      dateRange: '',
      anchorEl: null,
      setAnchorEl: null,
      creationModalOpen: false,
      apppintments: [],
      doctors: [],
    };

    this.initialize = this.initialize.bind(this);
    this.switchCalendarView = this.switchCalendarView.bind(this);
    this.handleClickNext = this.handleClickNext.bind(this);
    this.handleClickPrev = this.handleClickPrev.bind(this);
    this.handleClickToday = this.handleClickToday.bind(this);
    this.setDateRangeDisplay = this.setDateRangeDisplay.bind(this);
    this.formatAppointments = this.formatAppointments.bind(this);

    this.onBeforeCreateSchedule = this.onBeforeCreateSchedule.bind(this);
    this.openCreationModal = this.openCreationModal.bind(this);
    this.closeCreationModal = this.closeCreationModal.bind(this);

    this.calendarRef = React.createRef();
  }

  componentDidMount() {
    this.initialize();
  }

  initialize() {
    const apiCalls = [
      fetch('/api/appointment', {credentials: 'include'}).then(response => response.json()),
      fetch('/api/user?role=doctor', {credentials: 'include'}).then(response => response.json()),
    ];

    Promise.all(apiCalls)
      .then(([appointments, doctors]) => {
        const formattedAppointments = this.formatAppointments(appointments);
        const formattedDoctors = this.formatDoctors(doctors);

        this.setState({
          appointments: formattedAppointments,
          doctors: formattedDoctors,
        });

        this.setDateRangeDisplay();
      });
  }

  formatAppointments(appointments) {
    return appointments.map((appointment) => {
      return {
        id: appointment.id,
        title: appointment.title,
        isVisible: appointment.visible,
        start: appointment.start_time,
        end: appointment.end_time,
        category: 'time',
        calendarId: appointment.booked_with,
      }
    });
  }

  formatDoctors(doctors) {
    return doctors.map((doctor) => {
      return {
        id: doctor.id,
        name: `${doctor.firstname} ${doctor.lastname}`,
        borderColor: '#0000FF',
      }
    });
  }

  setDateRangeDisplay() {
    const { calendarView } = this.state;

    const calendarInstance = this.calendarRef.current.getInstance();
    const start = moment(calendarInstance.getDateRangeStart().toDate());
    const end = moment(calendarInstance.getDateRangeEnd().toDate());
    const current = moment(calendarInstance.getDate().toDate());
    let range;

    if (calendarView === 'month') {
      range  = current.format('MMMM YYYY').toUpperCase();
    } else if (calendarView === 'week') {
      const weekStart = start.format('MMMM D, YYYY').toUpperCase();
      const weekEnd = end.format('MMMM D, YYYY').toUpperCase();

      range = `${weekStart} - ${weekEnd}`;
    } else {
      range = current.format('MMMM Do, YYYY').toUpperCase();
    }

    this.setState({
      dateRange: range,
    });
  }

  switchCalendarView(event) {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      [name]: value,
    }, () => {
      this.setDateRangeDisplay();
    });
  }

  handleClickNext() {
    const calendarInstance = this.calendarRef.current.getInstance();

    calendarInstance.next();
    this.setDateRangeDisplay();
  }

  handleClickPrev() {
    const calendarInstance = this.calendarRef.current.getInstance();

    calendarInstance.prev();
    this.setDateRangeDisplay();
  }

  handleClickToday() {
    const calendarInstance = this.calendarRef.current.getInstance();

    calendarInstance.today();
    this.setDateRangeDisplay();
  }

  onBeforeCreateSchedule(event) {
    // console.log(event.guide)
    // const title = prompt('Schedule', '@suvrity\'s birthday');
    this.openCreationModal();
  }

  openCreationModal() {
    this.setState({
      creationModalOpen: true
    });
  }

  closeCreationModal() {
    this.setState({
      creationModalOpen: false
    });
  }

  render() {
    const {
      calendarView,
      dateRange,
      creationModalOpen,
      appointments,
      doctors,
    } = this.state;

    return (
      <div className='appointment-main-container'>
        <Modal
          className='modal-container'
          open={creationModalOpen}
          onClose={this.closeCreationModal}
        >
          <AppointmentCreationModal />
        </Modal>
        <div className='appointment-side-content'>
          hi there something
        </div>
        <Card className='calendar-container'>
          <div className='calendar-toolbar'>
            <span className='rangeRender'>{dateRange}</span>
            <Select
              native
              value={calendarView}
              onChange={this.switchCalendarView}
              name='calendarView'
            >
              <option value='month'>Monthly View</option>
              <option value='week'>Weekly View</option>
              <option value='day'>Daily View</option>
            </Select>
            <Button onClick={this.handleClickToday}>Today</Button>
            <Button onClick={this.handleClickPrev}>Prev</Button>
            <Button onClick={this.handleClickNext}>Next</Button>
          </div>
          <Calendar
            ref={this.calendarRef}
            onBeforeCreateSchedule={this.onBeforeCreateSchedule}
            view={calendarView}
            calendars={doctors}
            schedules={appointments}
          />
        </Card>
      </div>
    );
  }
}