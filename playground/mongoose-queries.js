const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo}     = require('./../server/models/todo');
const {User}     = require('./../server/models/user');

// var id = '5b0542af29e34b39341448e8';
var id = '5b02e703d2f7e018a40620f7';

// if (!ObjectID.isValid(id)) {
//   console.log('ID not valid');
// };



// Todo.find({
//   _id: id
// }).then((todos) => {
//   console.log('Todos: ', todos);
// });
//
// Todo.findOne({
//   _id: id
// }).then((todo) => {
//   console.log('Todo: ', todo);
// });

// Todo.findById(id).then((todo) => {
//   if (!todo) {
//     return console.log('ID was not found');
//   };
//   console.log('Todo By Id: ', todo);
// }).catch((e) => {
//   console.log(e);
// });

User.findById(id).then((user) => {
  if (!user) {
    return console.log('User ID was not found');
  };
  console.log('User By Id: ', user);
}).catch((e) => {
  console.log(e);
});
