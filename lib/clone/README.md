# {{PROJECT_NAME}}

====

Get started with

`npm install`

`bower install`

## Development setup
You're required to setup the following.

#### config/authentication.json
```javascript
{
  // noSQL
  "mongo": {
    "user": "user_name",
    "pass": "password",
    "url": "url.hostname.com:1234",
    "db": "database"
  },
  // or use SQL
  "sql": {
    dialect: 'sql_flavor',
    connection: {
      host     : '127.0.0.1',
      port     : 3306
      user     : 'your_database_user',
      password : 'your_database_password',
      database : 'myapp_test',
    }
  }
}
```

#### config/db.js
```javascript
// Authentication
var mongo = require('./authentication').mongo;
// Mongoose
var mongoose = require("mongoose");

module.exports.mongo = function() {
  // For collaborative developing / staging db
  return mongoose.connect('mongodb://'+mongo.user+':'+mongo.pass+'@'+mongo.url+'/'+mongo.db);
  // Local DB
  // return mongoose.connect('mongodb://localhost/'+mongo.db);
};
```

## Todo & Resources

- Todo 1

Some resource

#### Things to use

- Use this