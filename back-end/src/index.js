import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { Model } from 'objection';
import Knex from 'knex';

import { typeDefs } from "./schema.js";
import { resolvers } from "./graphql/resolvers.js"; // NEW: importing from new file

// 1. Initialize Knex and Objection
const knexConfig = (await import('../knexfile.js')).default.development;
const knex = Knex(knexConfig);
Model.knex(knex);

// 2. Setup Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 }
});

console.log('🚀 Server ready at', url);
