import { Model } from 'objection';

export default class Role extends Model {
  static get tableName() {
    return 'roles';
  }
}