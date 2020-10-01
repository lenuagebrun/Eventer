const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  host:{ type:String },
  name:{ type:String, required:true },
  description:{ type:String, required:true },
  location:{ type:String, required:true },
  date:{ type:Date, required:true},
  attendees:[{
    type:Schema.Types.ObjectId,
    ref: 'Users'
  }]
}, {
  timestamps:true
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event
