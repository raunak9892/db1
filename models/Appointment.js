const mongoose = require("mongoose");
const {Schema} = mongoose;

const NotesSchema = new Schema({
 
  time: {
    type: String,
  },
  date: {
    type: Date,
    required: true,
  },
  batchno: {
    type: Number,
    required: true,
  },
  participants: {
    type: Number,
    required: true,
    default:25
  },
  stcode:{
    type:Number,
    required: true,
    },
    endcode:{
      type:Number,
      required: true,
      },
    murl:{
      type:String,
      required:true
    },
    
  date: {
    type: Date,
    default: Date.now,
  },
 
});

module.exports = mongoose.model("appointment", NotesSchema);