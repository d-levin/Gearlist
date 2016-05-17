/* Database config settings */

module.exports = {
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    user: 'dbuser',
    password: 'dbpassword',
    database: 'myschema', // db must exist
    charset: 'utf8'
  }
};
