var path = require('path');
var router = require('express').Router();
var requireDirRoutes = require('require-dir')();

/* App specific routes */
/* Self executing function requires all files in the current dir */
(function() {
  Object.keys(requireDirRoutes).forEach(function(routeName) {
    router.use('/api', require('./' + routeName));
  });
})();

/* Route for home page */
router.get('/', function(req, res) {
  var myRes = '<h2>THE SERVER IS RUNNING!</h2>';
  myRes += '<h2>REQ HEADERS</h2><p>' + JSON.stringify(req.headers) + '</p>';
  myRes += '<h2>REQ BODY</h2><p>' + JSON.stringify(req.body) + '</p>';
  res.send(myRes);
});

/* Serve 404 for all undefined routes */
router.get('/*', function(req, res) {
  res.status(404).sendFile(path.join(__dirname, '../public/404.html'));
});

module.exports = router;
