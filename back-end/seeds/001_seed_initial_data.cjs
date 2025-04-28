// seeds/001_seed_initial_data.cjs
const { randomUUID } = require('crypto');

exports.seed = async function(knex) {
  console.log('🌱 Seeding database…');
  // wipe tables in reverse-FK order
  await knex('reviews').del();
  await knex('authors').del();
  await knex('games').del();

  // Pre-generate IDs so reviews/authors link correctly
  const gameIds = {
    zelda:   randomUUID(),
    ff7:     randomUUID(),
    elden:   randomUUID(),
    mario:   randomUUID(),
    pokemon: randomUUID(),
  };
  const authorIds = {
    mario: randomUUID(),
    yoshi: randomUUID(),
    peach: randomUUID(),
  };

  // 1) Insert games
  await knex('games').insert([
    { id: gameIds.zelda,   title: 'Zelda, Tears of the Kingdom', platform: ['Switch'] },
    { id: gameIds.ff7,     title: 'Final Fantasy 7 Remake',      platform: ['PS5','Xbox'] },
    { id: gameIds.elden,   title: 'Elden Ring',                 platform: ['PS5','Xbox','PC'] },
    { id: gameIds.mario,   title: 'Mario Kart',                 platform: ['Switch'] },
    { id: gameIds.pokemon, title: 'Pokemon Scarlet',            platform: ['PS5','Xbox','PC'] },
  ]);

  // 2) Insert authors
  await knex('authors').insert([
    { id: authorIds.mario, name: 'mario' },
    { id: authorIds.yoshi, name: 'yoshi' },
    { id: authorIds.peach, name: 'peach' },
  ]);

  // 3) Insert reviews (with their own UUIDs)
  await knex('reviews').insert([
    { id: randomUUID(), rating: 9,  content: 'lorem ipsum', author_id: authorIds.mario, game_id: gameIds.ff7 },
    { id: randomUUID(), rating: 10, content: 'lorem ipsum', author_id: authorIds.yoshi, game_id: gameIds.zelda },
    { id: randomUUID(), rating: 7,  content: 'lorem ipsum', author_id: authorIds.peach, game_id: gameIds.elden },
    { id: randomUUID(), rating: 5,  content: 'lorem ipsum', author_id: authorIds.yoshi, game_id: gameIds.mario },
    { id: randomUUID(), rating: 8,  content: 'lorem ipsum', author_id: authorIds.yoshi, game_id: gameIds.pokemon },
    { id: randomUUID(), rating: 7,  content: 'lorem ipsum', author_id: authorIds.mario, game_id: gameIds.ff7 },
    { id: randomUUID(), rating: 10, content: 'lorem ipsum', author_id: authorIds.peach, game_id: gameIds.zelda },
  ]);
};
