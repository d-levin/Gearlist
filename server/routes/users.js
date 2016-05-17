var router = require('express').Router();

var Users = require('../models/user').Users;
var User = require('../models/user').User;

router.route('/users')
  // Returns all users
  .get(function(req, res) {
    Users.forge()
      .fetch()
      .then(function(collection) {
        res.json({ error: false, data: collection.toJSON() });
      })
      .catch(function(err) {
        res.status(500).json({ error: true, data: { message: err.message } });
      });
  })
  // Create user
  .post(function(req, res) {
    User.forge({
        first_name: req.body.firstName,
        last_name: req.body.lastName,
        email: req.body.email,
        password: req.body.password
      })
      .save()
      .then(function(user) {
        res.json({ error: false, data: { id: user.get('id') } });
      })
      .catch(function(err) {
        res.status(500).json({ error: true, data: { message: err.message } });
      });
  });

router.route('/users/:id')
  // Get user by ID
  .get(function(req, res) {
    User.forge({ id: req.params.id })
      .fetch()
      .then(function(user) {
        if (!user) {
          res.status(404).json({ error: true, data: {} });
        } else {
          res.json({ error: false, data: user.toJSON() });
        }
      })
      .catch(function(err) {
        res.status(500).json({ error: true, data: { message: err.message } });
      });
  })
  // Update user by ID
  .put(function(req, res) {
    User.forge({ id: req.params.id })
      .fetch({ require: true })
      .then(function(user) {
        user.save({
            email: req.body.email || user.get('email'),
            first_name: req.body.firstName || user.get('first_name'),
            last_name: req.body.lastName || user.get('last_name'),
            password: req.body.password || user.get('password')
          })
          .then(function() {
            res.json({ error: false, data: { message: 'User updated' } });
          })
          .catch(function(err) {
            res.status(500).json({ error: true, data: { message: err.message } });
          });
      })
      .catch(function(err) {
        res.status(500).json({ error: true, data: { message: err.message } });
      });
  })
  // Delete user by ID
  .delete(function(req, res) {
    User.forge({ id: req.params.id })
      .fetch({ require: true })
      .then(function(user) {
        user.destroy()
          .then(function() {
            res.json({ error: true, data: { message: 'User successfully deleted' } });
          })
          .catch(function(err) {
            res.status(500).json({ error: true, data: { message: err.message } });
          });
      })
      .catch(function(err) {
        res.status(500).json({ error: true, data: { message: err.message } });
      });
  });

module.exports = router;
