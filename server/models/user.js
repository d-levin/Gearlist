var bookshelf = require('../services/bookshelf');

require('./item');
require('./list');
require('./category');
var User = bookshelf.Model.extend({
  tableName: 'users',
  items: function() {
    return this.hasMany('Item');
  },
  lists: function() {
    return this.hasMany('List');
  },
  categories: function() {
    return this.hasMany('Category');
  }
});

var Users = bookshelf.Collection.extend({
  model: User
});

module.exports = {
  User: bookshelf.model('User', User),
  Users: bookshelf.collection('Users', Users)
};
