const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require("./User");

const placeDetailsSchema = new mongoose.Schema({
  // Define the fields you want to store for the movie details
  id: { type: String, required: true },
  title: { type: String, required: true },
  poster: { type: String, required: true },
  // Add other fields as needed
});

const watchlistSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  placeDetails: placeDetailsSchema
});

const Watchlist = mongoose.model('Watchlist', watchlistSchema);

module.exports = Watchlist;
