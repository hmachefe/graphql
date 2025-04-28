/**
 * @param {import('knex').Knex} knex
 */
exports.up = function(knex) {
    return knex.schema
      .createTable('games', (table) => {
        table.uuid('id').primary();
        table.string('title').notNullable();
        table.specificType('platform', 'text[]');
      })
      .createTable('authors', (table) => {
        table.uuid('id').primary();
        table.string('name').notNullable();
      })
      .createTable('reviews', (table) => {
        table.uuid('id').primary();
        table.integer('rating').notNullable();
        table.text('content');
        table.uuid('game_id').references('id').inTable('games').onDelete('CASCADE');
        table.uuid('author_id').references('id').inTable('authors').onDelete('CASCADE');
      });
  };
  
  /**
   * @param {import('knex').Knex} knex
   */
  exports.down = function(knex) {
    return knex.schema
      .dropTableIfExists('reviews')
      .dropTableIfExists('authors')
      .dropTableIfExists('games');
  };
  
  