import Appointment from '../../models/appointment.js';
import Company from '../../models/company.js';
import { decodeToken } from '../../services/auth.js';

const getAllAppointments = async (req, res) => {
  const userData = decodeToken(req.cookies.jwtToken);
  const companyUuid = userData.companyUuid;
  
  try {
    const company = await Company.query()
      .findOne({
        uuid: companyUuid,
      })
      .throwIfNotFound();

    // Would have to query date range of just what is shown in the current calendar
    const appointments = await Appointment.query()
      .where('company_id', company.id)
      .select(
        'id',
        'patient_id', 
        'title', 
        'description', 
        'visible', 
        'booked_with', 
        'created_by', 
        'start_time', 
        'end_time'
      )
      .throwIfNotFound();

    return res.json(appointments);
  } catch (err) {
    console.log(err)
    console.log('Unsuccessful');
  }
}

export {
  getAllAppointments,
}