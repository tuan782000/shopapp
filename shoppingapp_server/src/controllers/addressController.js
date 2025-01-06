const AddressModel = require("../models/addressModel");

const addNewAddress = async (req, res) => {
  const body = req.body;
  // console.log(body);

  try {
    const address = await AddressModel(body);
    await address.save();
    res.status(200).json({
      message: "Post new address successfully",
      data: address,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

// lấy ra danh sách address của người dùng
const getAllAddress = async (req, res) => {
  const { id } = req.params;

  console.log(id);

  try {
    const listAddress = await AddressModel.find({ uid: id }); // tìm kiếm trên id danh sách người dùng

    res.status(200).json({
      message: "User address list retrieved successfully",
      data: listAddress,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

// lấy ra cái người dùng đang chọn

// cập nhật address

const updateAddress = async (req, res) => {
  const { id } = req.params;
  const dataUpdated = req.body;

  // console.log(id);
  // console.log(body);

  try {
    const addressUpdated = await AddressModel.findByIdAndUpdate(
      id,
      dataUpdated
    );

    if (!addressUpdated) {
      res.status(404).json({
        message: "Address not found",
      });
    }

    res.status(201).json({
      message: "Updated brand successfully",
      data: dataUpdated,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

// xoá address

const removeAddress = async (req, res) => {
  const { id } = req.query;
  console.log(id);

  try {
    await AddressModel.findByIdAndDelete(id); // id của address đó "_id"
    res.status(201).json({
      message: "Remove brand successfully",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

// const choosenAddress = async (req, res) => {

// }

module.exports = {
  addNewAddress,
  getAllAddress,
  updateAddress,
  removeAddress,
};
