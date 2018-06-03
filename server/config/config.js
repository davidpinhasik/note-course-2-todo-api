var env = process.env.NODE_ENV || 'development';
console.log('env ******** ', env);

if (env === 'development' || env === 'test') {
  var config = require('./config.json');
  var envConfig = config[env];

  Object.keys(envConfig).forEach((key) => {
    process.env[key] = envConfig[key];
  });

};


// to set environment variables in production, enter:
// heroku Config
// to set a specific env variable, Enter:
// heroku config:set NAME = DAVIDEXAMPLE
// to retrieve a specific env variable, enter:
// heroku config:get NAME
// to remove a specific env variable, enter:
// heroku config:unset NAME
