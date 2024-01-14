const Watchlist = require("../models/Watchlist");
const User = require("../models/User");

// Controller method to get all places in the user's watchlist
const getWatchlist = async (req, res, next) => {
  try {
    const userId = req.user.id; // Assuming you have middleware to extract the user ID

    const watchlist = await Watchlist.find({ user: userId });

    res.json({ data: watchlist });
  } catch (err) {
    next(err);
  }
};

// Controller method to add a place to the user's watchlist
const addToWatchlist = async (req, res, next) => {
  try {
    const userId = req.user.id; // Assuming you have middleware to extract the user ID
    const { id, title, poster } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const placeDetails = {
      id,
      title,
      poster,
      // Add other fields as needed
    };

    const watchlistItem = new Watchlist({
      user: userId,
      placeDetails: placeDetails,
    });

    user.watchlist.push(watchlistItem);
    await user.save();

    await watchlistItem.save();

    res.json({ data: [watchlistItem] });
  } catch (err) {
    next(err);
  }
};

// Controller method to remove a place from the user's watchlist
const removeFromWatchlist = async (req, res, next) => {
  try {
    const userId = req.user.id; // Assuming you have middleware to extract the user ID
    const watchlistItemId = req.params.id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const watchlistItem = await Watchlist.findByIdAndDelete(watchlistItemId);

    // Filter out the removed watchlist item
    user.watchlist = user.watchlist.filter(
      (item) => item.toString() !== watchlistItemId
    );
    await user.save();

    res.json({ data: watchlistItem });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getWatchlist,
  addToWatchlist,
  removeFromWatchlist,
};
