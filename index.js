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
    },
    Game: {
        reviews(parent, args, context) {
            return db.reviews.filter(review => review.game_id === parent.id);
        }
    },
    Author: {
        reviews(parent, args, context) {
            return db.reviews.filter(review => review.author_id === parent.id);
        }
    },
    Review: {
        game(parent, args, context) {
            return db.games.find(game => game.id === parent.game_id);
        },
        author(parent, args, context) {
            return db.authors.find(author => author.id === parent.author_id);
        }
    },
    Mutation: {
        deleteGame(parent, args, context) {
            db.games = db.games.filter(game => game.id !== args.id);
            return db.games;
        },
        addGame(parent, args, context) {
            const id = Math.floor(1000 * Math.random());
            db.games.push({
                id,
                ...args.game
            });
            return db.games;
        },
        updateGame(parent, args, context) {
            console.log('1');
            db.games = db.games.map((game) => {
                if (game.id === args.id) {
                    console.log('2');
                    return {
                        ...game,
                        ...args.edits
                    };
                }
                return game;
            });
            return db.games;
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