const { default: mongoose } = require("mongoose");

const BrandSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
  },
  imageURL: {
    type: String,
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

const BrandModel = mongoose.model("brands", BrandSchema);
module.exports = BrandModel;
