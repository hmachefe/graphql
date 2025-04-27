import { Model } from 'objection';
import Review from './Review.js';

export default class Game extends Model {
  static get tableName() {
    return 'games';
  }

  static get relationMappings() {
    return {
      reviews: {
        relation: Model.HasManyRelation,
        modelClass: Review,
        join: {
          from: 'games.id',
          to: 'reviews.game_id'
        }
      }
    };
  }
}
