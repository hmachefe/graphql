import { Model } from 'objection';

export default class Author extends Model {
  static get tableName() {
    return 'authors';
  }
}
