const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const createdEventSchema = new Schema({
  name:{type:String, required:true, unique:true},
  description:{type:String, required:true, unique:true},
  date:{type:Date, required:true},
  location:{type:String, required:true, unique:true},
})


const userSchema = new Schema({
  username:{
    type:String,
    required:true,
    unique:true,
    trim:true,
    minlength:3
  },
  firstname:{
    type:String,
    required:true
  },
  lastname:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  password:{
    type:String,
    required:true,
    minlength:8
  },
  avatar:{
    type:String,
  },
  createdEvent:[createdEventSchema],
  attending:[{
    type:Schema.Types.ObjectId,
    ref: 'Event'
  }]
}, {
  timestamps:true
});

const Users = mongoose.model('Users', userSchema);

module.exports = Users
