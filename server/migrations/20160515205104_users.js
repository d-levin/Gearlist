/* Initialize database schemas */

exports.up = function(knex, Promise) {

  return Promise.all([

    // Users table
    knex.schema.createTable('users', function(table) {
      table.increments('id').primary();
      table.string('first_name', 45).notNullable();
      table.string('last_name', 45).notNullable();
      table.string('email').unique().notNullable();
      table.string('password', 60).notNullable();
      table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    })
    // Items table
    .createTable('items', function(table) {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.string('description');
      table.decimal('weight_oz');
      table.string('image_url');
      table.integer('user_id')
        .unsigned()
        .notNullable()
        .references('users.id')
        .onDelete('CASCADE');
      table.unique(['name', 'user_id']);
    })
    // Lists table
    .createTable('lists', function(table) {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.string('description');
      table.integer('user_id')
        .unsigned()
        .notNullable()
        .references('users.id')
        .onDelete('CASCADE');
      table.unique(['name', 'user_id']);
    })
    // Categories table
    .createTable('categories', function(table) {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.integer('user_id')
        .unsigned()
        .notNullable()
        .references('users.id')
        .onDelete('CASCADE');
      table.unique(['name', 'user_id']);
    })
    // An item belongs to many lists; lists have many items
    .createTable('lists_items', function(table) {
      table.integer('list_id')
        .unsigned()
        .references('lists.id');
      table.integer('item_id')
        .unsigned()
        .references('items.id');
      table.integer('category_id')
        .unsigned()
        .references('categories.id');
      table.unique(['list_id', 'item_id', 'category_id']);
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    // Must drop in order
    knex.schema.dropTable('lists_items'),
    knex.schema.dropTable('categories'),
    knex.schema.dropTable('lists'),
    knex.schema.dropTable('items'),
    knex.schema.dropTable('users')
  ]);
};
