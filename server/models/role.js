import { Model } from 'objection';
import User from './user.js';

export default class Role extends Model {
  static get tableName() {
    return 'roles';
  }

  static get relationMappings() {
    return {
      roles: {
        relation: Model.ManyToManyRelation,
        modelClass: User,
        join: {
          from: 'roles.id',
          through: {
            from: 'user_roles.role_id',
            to: 'user_roles.user_id'
          },
          to: 'users.id'
        }
      }
    }
  }
}