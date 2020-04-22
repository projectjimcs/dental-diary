import { Model } from 'objection';
import Role from './role.js';

export default class User extends Model {
  static get tableName() {
    return 'users';
  };

  static get relationMappings() {
    return {
      roles: {
        relation: Model.ManyToManyRelation,
        modelClass: Role,
        join: {
          from: 'users.id',
          through: {
            from: 'user_roles.user_id',
            to: 'user_roles.role_id'
          },
          to: 'roles.id'
        }
      }
    }
  }
}