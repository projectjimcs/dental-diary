import User from '../../models/user.js';
import Company from '../../models/company.js';
import AccountType from '../../models/accountType.js';
import UserRole from '../../models/userRole.js';
import Role from '../../models/role.js';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import { decodeToken } from '../../services/auth.js';

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

const getUsers = async (req, res) => {
  const validRoles = ['admin', 'doctor', 'employee'];

  const userData = decodeToken(req.cookies.jwtToken);
  const companyUuid = userData.companyUuid;

  const company = await Company.query()
    .findOne({
      uuid: companyUuid,
    });
  
  if (req.query.role && validRoles.includes(req.query.role)) {
    try {
      const users = await User.query()
        .select('uuid', 'firstname', 'lastname')
        .withGraphFetched('roles')
        .modifyGraph('roles', builder => {
          builder.where('key', req.query.role)
        })
        .then((users) => {
          return users.filter(user => user.roles.length);
        });
        
      return res.json(users);
    } catch (err) {
      console.log('Users not found');
    }
  }

  try {
    const users = await User.query()
      .where('company_id', company.id)
      .select(
        'uuid',
        'firstname',
        'lastname',
      )
      .throwIfNotFound();

    return res.json(users);
  } catch (err) {
    console.log('Users not found');
  }
}

export {
  create,
  getUsers,
}