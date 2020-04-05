import { Model } from 'objection';

export default class UserRole extends Model {
  static get tableName() {
    return 'user_roles';
  }
}