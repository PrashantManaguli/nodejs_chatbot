const mongoose = require("mongoose");
const msgSchema = new mongoose.Schema({
  msg: {
    type: String,
    required: true
  },
  memId: {
    type: Number,
    reuired: true

  }
});
const Msg = mongoose.model('msg', msgSchema);
module.exports = Msg;