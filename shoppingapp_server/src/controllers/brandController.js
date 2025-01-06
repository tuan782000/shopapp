const BrandModel = require("../models/brandModel");

const getBrands = async (req, res) => {
  try {
    const brands = await BrandModel.find();

    res.status(200).json({
      message: "Get list brands successfully",
      data: brands,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const getBrandWithId = async (req, res) => {
  const { id } = req.params;

  // console.log(id);
  try {
    const brand = await BrandModel.findById(id);

    res.status(200).json({
      message: "Get list brand successfully",
      data: brand,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const addBrand = async (req, res) => {
  const body = req.body;
  try {
    const brand = new BrandModel(body);

    await brand.save();

    res.status(201).json({
      message: "Add brand successfully",
      data: brand,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const editBrand = async (req, res) => {
  const { id } = req.params;
  const dataUpdated = req.body;

  try {
    const brandUpdated = await BrandModel.findByIdAndUpdate(id, dataUpdated);

    if (!brandUpdated) {
      return res.status(404).json({
        message: "Brand not found",
      });
    }

    res.status(200).json({
      message: "Updated brand successfully",
      data: brandUpdated,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const removeBrand = async (req, res) => {
  const { id } = req.query;

  try {
    await BrandModel.findByIdAndDelete(id);

    res.status(201).json({
      message: "Remove brand successfully",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

module.exports = {
  getBrands,
  getBrandWithId,
  addBrand,
  editBrand,
  removeBrand,
};
