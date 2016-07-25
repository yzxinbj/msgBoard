var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var settings = require('../setting');
var models = require('./models');

mongoose.connect(settings.url);
mongoose.model('Comment',new Schema(models.Comment));

global.Model = function(type){
    return mongoose.model(type);
};

