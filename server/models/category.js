var bookshelf = require('../services/bookshelf');

require('./user');
var Category = bookshelf.Model.extend({
  tableName: 'categories',
  user: function() {
    return this.belongsTo('User');
  }
});

var Categories = bookshelf.Collection.extend({
  model: Category
});


module.exports = {
  Category: bookshelf.model('Category', Category),
  Categories: bookshelf.collection('Categories', Categories)
};
