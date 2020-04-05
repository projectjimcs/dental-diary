import AccountType from '../../models/accountType.js';
import Role from '../../models/Role.js';

const getAccountTypes = async (req, res) => {
  try {
    const accountTypes = await AccountType.query();

    res.json(accountTypes);
  } catch (err) {
    console.log('Unsuccessful');
  }
}

const getRoles = async (req, res) => {
  try {
    const roles = await Role.query();

    res.json(roles);
  } catch (err) {
    console.log('Unsuccessful');
  }
}

export {
  getRoles,
  getAccountTypes,
}