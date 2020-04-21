import { Model } from 'objection';

export default class AccountType extends Model {
  static get tableName() {
    return 'appointments';
  }
}