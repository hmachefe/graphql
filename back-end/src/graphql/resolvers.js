// src/graphql/resolvers.js
import Game from '../models/Game.js';
import Review from '../models/Review.js';
import Author from '../models/Author.js';
import { v4 as uuidv4 } from 'uuid';

export const resolvers = {
  Query: {
    games: () => Game.query().withGraphFetched('reviews.author'),
    game: (_, { id }) => Game.query().findById(id).withGraphFetched('reviews.author'),
    reviews: () => Review.query().withGraphFetched('author'),
    review: (_, { id }) => Review.query().findById(id).withGraphFetched('author'),
    authors: () => Author.query(),
    author: (_, { id }) => Author.query().findById(id),
  },

  Mutation: {
    addGame: async (_, { game }) => {
      await Game.query().insert({ id: uuidv4(), ...game });
      return Game.query().withGraphFetched('reviews.author');
    },
    updateGame: async (_, { id, edits }) => {
      await Game.query().patchAndFetchById(id, edits);
      return Game.query().withGraphFetched('reviews.author');
    },
    deleteGame: async (_, { id }) => {
      await Game.query().deleteById(id);
      return Game.query().withGraphFetched('reviews.author');
    },
  },

  Game: {
    reviews: (parent) => Review.query().where('game_id', parent.id)
  },

  Review: {
    author: (parent) => Author.query().findById(parent.author_id),
    game: (parent) => Game.query().findById(parent.game_id)
  },

  Author: {
    reviews: (parent) => Review.query().where('author_id', parent.id),
    verified: () => true, // Fake for now since not in DB
  }
};
