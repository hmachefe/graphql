import { Model } from 'objection';
import Game from './Game.js';
import Author from './Author.js';

export default class Review extends Model {
  static get tableName() {
    return 'reviews';
  }

  static get relationMappings() {
    return {
      game: {
        relation: Model.BelongsToOneRelation,
        modelClass: Game,
        join: {
          from: 'reviews.game_id',
          to: 'games.id'
        }
      },
      author: {
        relation: Model.BelongsToOneRelation,
        modelClass: Author,
        join: {
          from: 'reviews.author_id',
          to: 'authors.id'
        }
      }
    };
  }
}
