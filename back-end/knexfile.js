// back-end/knexfile.js
export default {
    development: {
      client: 'pg',
      connection: {
        host:     '127.0.0.1',
        port:     5432,
        database: 'graphql_example',
        user:     'graphql_user',
        password: 'hugo', // TEMP
      },
      migrations: { directory: './migrations', extension: 'js' },
      seeds:      { directory: './seeds',     extension: 'cjs' },
    },
  };
  