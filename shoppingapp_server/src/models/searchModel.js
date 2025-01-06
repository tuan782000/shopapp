const { default: mongoose } = require("mongoose");

const SearchSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  slug: {
    type: String,
  },
  count: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

const SearchModel = mongoose.model("searches", SearchSchema);
module.exports = SearchModel;
