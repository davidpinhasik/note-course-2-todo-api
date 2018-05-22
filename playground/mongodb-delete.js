// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  };

  console.log('Connected to MongoDB server');

  // deleteMany
  // db.collection('Users').deleteMany({name: 'David Pinhasik'}).then((result) => {
  //   console.log(result);
  // });

  // deleteOne
  // db.collection('Users').deleteOne({_id: new ObjectID('5afd90314202bf06a8ba632b')}).then((result) => {
  //   console.log(result);
  // });


  // findOneAndDelete
  db.collection('Users').findOneAndDelete({_id: new ObjectID('5afd90314202bf06a8ba632b')}).then((result) => {
    console.log(result);
  });

  // db.close();
});