const mongoose = require("mongoose");
const {Schema} = mongoose;

const NotesSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  name: {
    type: String,
  },
  address: {
    type: String,
    required: true,
  },
  bloodgroup: {
    type: String,
    default: "General",
  },
  medicalconditions: {
    type: String,
    default: "General",
  },
  pincode: {
    type: String,
    default: "General",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("blood", NotesSchema);