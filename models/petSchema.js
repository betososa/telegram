var mongoose = require('mongoose');

var PetSchema = new mongoose.Schema({
  petName: String,
  petPic: String,
  userId: Number,
  report: { coordinates: Array, reported_at: Date },
});

module.exports = mongoose.model('pet', PetSchema);
