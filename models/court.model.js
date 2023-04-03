const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const courtSchema = new Schema({
  name: { type: String, required: true },
  surface: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Court = mongoose.model('Court', courtSchema);

module.exports = Court;
