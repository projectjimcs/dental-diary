import User from '../../models/user.js';
import Company from '../../models/company.js';
import AccountType from '../../models/accountType.js';
import UserRole from '../../models/userRole.js';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';

const create = async (req, res) => {
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
  } = req.body;

  let companyId;
  let accountTypeId;

  try {
    companyId = await Company.query()
      .where('uuid', companyUuid)
      .select('id')
      .throwIfNotFound()
      .then(companies => companies.map(company => company.id)[0]); // Refactor
  } catch (err) {
    console.log('Company not found');
    res.status('404').end();
  }

  try {
    accountTypeId = await AccountType.query()
      .select('id')
      .where('key', accountTypeKey)
      .throwIfNotFound()
      .then(accountTypes => accountTypes.map(accountType => accountType.id)[0]); // Refactor
  } catch (err) {
    console.log('Account Type not found');
    res.status('404').end();
  }

  const uuid = uuidv4();
  const hashedPassword = bcrypt.hashSync(password, 12);

  try {
    const newUser = await User.transaction(async trx => {
      const newUser = await User.query(trx).insert({
        company_id: companyId,
        uuid: uuid,
        password: hashedPassword,
        firstname: firstName,
        lastname: lastName,
        email: email,
        phone: phone || null,
        address: address || null,
        account_type_id: accountTypeId,
        status: 'active',
      });

      return newUser;
    });

    selectedRoles.forEach(async role => {
      let newRole = await UserRole.transaction(async trx => {
        let newRole = await UserRole.query(trx).insert({
          user_id: newUser.id,
          role_id: role,
        });

        return newRole;
      });
    });
    // Insert response here
  } catch (err) {
    console.log(err);
    console.log('Unsucessful user creation');
  }
}

export {
  create,
}