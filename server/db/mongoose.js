var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://david:S@deena#9@ds115131.mlab.com:15131/todo-app-api' ||  'mongodb://localhost:27017/TodoApp');

module.exports = {mongoose};
