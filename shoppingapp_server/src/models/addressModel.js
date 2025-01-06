const { default: mongoose } = require("mongoose");

const AddressSchema = new mongoose.Schema({
  address: {
    require: true,
    type: String,
  },
  uid: {
    require: true,
    type: String,
  },
  checked: Boolean,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

const AddressModel = mongoose.model("addresses", AddressSchema);
module.exports = AddressModel;
