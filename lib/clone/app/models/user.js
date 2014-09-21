/*
User Model
 */
var User, Schema, mongoose, userchema;

// Mongoose
mongoose = require('mongoose');

// initialize schema
Schema = mongoose.Schema;

// Instantiate userschema
userSchema = new Schema({
  email:       {
    type: String,
    required: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  photo:       String,
  name: {
    first:     {type: String, required: true},
    last:      {type: String, required: true}
  },
  password:    {
    type: String,
    required: true,
  },
  permission:  Boolean,
  modified_at: Date,
  created_at:  Date,
  resetPasswordToken: String,
  resetPasswordExpires: Date
});

// Create usermodel
User = mongoose.model('user', userSchema);

// Export User
exports.model  = User;
exports.schema = userSchema;
