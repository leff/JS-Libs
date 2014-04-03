/* GET home page. */
exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.marionette = function(req, res){
  res.render('marionette', { title: 'Marionette' });
};
