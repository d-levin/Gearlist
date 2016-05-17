var bookshelf = require('../services/bookshelf');

require('./user');
require('./item');
var List = bookshelf.Model.extend({
  tableName: 'lists',
  user: function() {
    return this.belongsTo('User');
  },
  items: function() {
    return this.belongsToMany('Item');
  }
});

var Lists = bookshelf.Collection.extend({
  model: List
});


module.exports = {
  List: bookshelf.model('List', List),
  Lists: bookshelf.collection('Lists', Lists)
};
