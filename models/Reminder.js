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
  phoneno: {
    type: String,
    required: true,
  },
  medicines: {
    type: String,
    default: "General",
  },
  time: {
    type: String,
    default: "General",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("reminder", NotesSchema);