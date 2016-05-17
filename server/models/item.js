var bookshelf = require('../services/bookshelf');

require('./user');
require('./list');
var Item = bookshelf.Model.extend({
  tableName: 'items',
  user: function() {
    return this.belongsTo('User');
  },
  lists: function() {
    return this.belongsToMany('List');
  }
});

var Items = bookshelf.Collection.extend({
  model: Item
});


module.exports = {
  Item: bookshelf.model('Item', Item),
  Items: bookshelf.collection('Items', Items)
};
