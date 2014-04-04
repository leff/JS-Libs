/* GET home page. */
exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.marionette = function(req, res){
  res.render('marionette', { title: 'Marionette' });
};

exports.giraffe = function(req, res){
  res.render('giraffe', { title: 'Giraffe' });
};

exports.knockout = function(req, res){
  res.render('knockout', { title: 'Knockout' });
};