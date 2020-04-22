import Company from '../../models/company.js';
import { v4 as uuidv4 } from 'uuid';

const getCompanies = async (req, res) => {
  try {
    const companies = await Company.query()
      .select('uuid', 'name', 'email', 'phone', 'address', 'timezone', 'status');

    return res.json(companies);
  } catch (err) {
    console.log('Unsuccessful');
  }
}

const create = async (req, res) => {
  const {
    companyName,
    companyEmail,
    companyPhone,
    companyAddress,
    companyTimezone,
  } = req.body;

  const uuid = uuidv4();

  // No point doing transaction here, delete later
  try {
    const newCompany = await Company.transaction(async trx => {
      const newCompany = await Company.query(trx).insert({
        name: companyName,
        uuid: uuid,
        email: companyEmail || null,
        phone: companyPhone || null,
        address: companyAddress || null,
        timezone: companyTimezone,
        status: 'active',
      });

      return newCompany;
    });

    // Insert response here
  } catch (err) {
    console.log('Unsucessful');
  }
}

const update = async (req, res) => {
  const {
    companyName,
    companyEmail,
    companyPhone,
    companyAddress,
    companyTimezone,
  } = req.body;

  const updateData = {
    name: companyName,
    email: companyEmail || null,
    phone: companyPhone || null,
    address: companyAddress || null,
    timezone: companyTimezone,
  }

  try {
    const company = await Company.query()
    .where('uuid', req.params.companyUuid)
    .patch(updateData)
    .throwIfNotFound();
  } catch (err) {
    res.status('404').end();
  }
}

export {
  create,
  update,
  getCompanies,
}