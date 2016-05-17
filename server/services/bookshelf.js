/* MySQL database connection */

var dbConfig = require('../knexfile');

var knex = require('knex')(dbConfig);
knex.migrate.latest([dbConfig]);
var bookshelf = require('bookshelf')(knex);

// Avoid circular includes
bookshelf.plugin('registry');

module.exports = bookshelf;
