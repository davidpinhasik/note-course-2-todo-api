const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo}     = require('./../server/models/todo');
const {User}     = require('./../server/models/user');

// Todo.remove({})
// Todo.remove({}).then((result) => {
//   console.log(result);
// });

// Todo.findOneAndRemove()
// findByIdAndRemove()

// Todo.findByOneAndRemove({_id: '5b06c5d74202bf06a8bc48fe'}).then((todo) => {
//   console.log(todo);
// });


Todo.findByIdAndRemove('5b06c5d74202bf06a8bc48fe').then((todo) => {
  console.log(todo);
});
