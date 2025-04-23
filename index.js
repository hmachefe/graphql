import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

// db
import db from "./_db.js";

// types
import { typeDefs } from "./schema.js";

const resolvers = {
    Query: {
        games() {
            return db.games;
        },
        game(parent, args, context) {
            return db.games.find(game => game.id === args.id);
        },
        reviews() {
            return db.reviews;
        },
        review(parent, args, context) {
            return db.reviews.find(review => review.id === args.id);
        },
        authors() {
            return db.authors;
        },
        author(parent, args, context) {
            return db.authors.find(author => author.id === args.id);
        }
    }
}

// server setup 
const server = new ApolloServer({
    typeDefs,
    resolvers
});

const { url } = await startStandaloneServer(server, {
    listen: {
        port: 4000
    }
});

console.log('Server ready at port', 4000);