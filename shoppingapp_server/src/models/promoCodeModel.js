const { default: mongoose } = require("mongoose");

const PromoCodeSchema = new mongoose.Schema({
  title: {
    require: true,
    type: String,
  },
  description: {
    type: String,
  },
  code: {
    require: true,
    type: String,
  },
  percent: {
    require: true,
    type: Number,
  },
  start: {
    type: Date,
    value: Date.now(),
  },
  end: {
    type: Date,
    value: Date.now(),
  },
});

const PromoCodeModel = mongoose.model("promoCodes", PromoCodeSchema);
module.exports = PromoCodeModel;
