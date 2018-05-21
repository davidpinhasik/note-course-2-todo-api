// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  };

  console.log('Connected to MongoDB server');

  // db.collection('Todos').findOneAndUpdate(
  //   {_id: new ObjectID('5b02bd5e4202bf06a8ba6eac')
  // },
  //   {
  //     $set: {
  //       completed: true
  //     }
  //   }, {
  //     returnOriginal: false
  //   }).then((result) => {
  //     console.log(result);
  //   });

  db.collection('Users').findOneAndUpdate(
    {_id: new ObjectID('5afd8fed4202bf06a8ba6316')
  },
    {
      $set: {
        name: 'David Pinhasik'
      },
      $inc: {
        age: 1
      }
    }, {
      returnOriginal: false
    }).then((result) => {
      console.log(result);
    });

  // db.close();
});
